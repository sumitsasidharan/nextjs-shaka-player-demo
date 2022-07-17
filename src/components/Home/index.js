
import ShakaPlayer from '../ShakaPlayer';

import styles from './styles.module.scss';

const Home = () => {
  return (
    <div id={styles.home}>
      <h1>Home</h1>
      <ShakaPlayer />
    </div>
  )
}

export default Home;