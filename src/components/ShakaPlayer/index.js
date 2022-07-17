import { useRef, useEffect, useState } from 'react'
import shaka from 'shaka-player';

import usePlayer from '../../hook/usePlayer';

import styles from './styles.module.scss';

const ShakaPlayer = () => {
  const videoRef = useRef();
  const {play, pause, playerState, updateTime} = usePlayer(videoRef);

  async function configurePlayer(manifest, license) {
    const player = new shaka.Player(videoRef.current)
    if (videoRef.current !== null) {
      player.configure({
        drm: {
          servers: {
            'com.widevine.alpha': license
          },
          advanced: {
            'com.widevine.alpha': {
              videoRobustness: 'SW_SECURE_CRYPTO',
              audioRobustness: 'SW_SECURE_CRYPTO'
            }
          }
        },
        preferredTextLanguage: 'pt-br'
      })

      await player.load(manifest)
    }
  }

  const handleButton = () => {
    if (!playerState.playing)
    {
      play();
      videoRef.current.play();
    } else {
      pause();
      videoRef.current.pause();
    }
                
  }


  useEffect(() => {
    const manifest = "https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd";
    const license = "https://widevine-proxy.appspot.com/proxy";
    configurePlayer(manifest, license);
    console.log('shaka player configured!');
  }, [])

  return (
    <div id={styles.shakaPlayer}>
      <div className={styles.container}>
        <h2>Shaka player</h2>
        <video ref={videoRef} width="640" onTimeUpdate={updateTime} />
        
          <button onClick={handleButton} >
            {playerState.playing ? 'Pause' : 'Play'}
          </button>
        </div>
    </div>
  )
}

export default ShakaPlayer;