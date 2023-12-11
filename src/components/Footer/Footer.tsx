import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.content}> &#xa9; 2023 Alex Urbanskyi</p>
        <p className={styles.product}>Equip Manager</p>
        <p className={styles.content}>email: alexurbanvin@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;
