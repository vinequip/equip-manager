import styles from './loader.module.css'


function Loader() {
  return (
    <div className={styles.loader__overlay}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
