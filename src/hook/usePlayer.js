import { useState, useEffect } from 'react';

export default function usePlayer (videoRef) {
  const [playerState, setPlayerState] = useState({
    playing: false,
    currentTime: 0
  })

  useEffect(() => {
    playerState.playing ? videoRef.current.play() : videoRef.current.pause()
  }, [playerState.playing])

  function play() {
    setPlayerState({
      ...playerState,
      playing: true
    })
  }
  function pause () {
    setPlayerState({
      ...playerState,
      playing: false
    })
  }

  /*
   * Chamado diretamente do evento onTimeUpdate
   */
  function updateTime (e) {
    console.log(e);
    setPlayerState({
      ...playerState,
      currentTime: videoRef.current.currentTime
    })
  }

  return {
    playerState,
    play,
    pause,
    updateTime
  }
}
