import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/slice/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import logo from "../../assets/logoEM2.png";
import { MdLogout } from "react-icons/md";

import styles from "./header.module.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.logo__holder}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="LOGO" />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navlink__list}>
            <li className={styles.nav__link}>
              <Link to="/">Головна</Link>
            </li>
            <li className={styles.nav__link}>
              <Link to="/workers">Працівники</Link>
            </li>
            <li className={styles.nav__link}>
              <Link to="#">Монітори</Link>
            </li>
            <li className={styles.nav__link}>
              <Link to="#">Стільці</Link>
            </li>
            <li className={styles.nav__link}>
              <Link to="#">Ноутбуки</Link>
            </li>
          </ul>
          <button className={styles.logout__btn} onClick={logOut}>
            <MdLogout size={25} />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
