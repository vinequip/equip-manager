import UserProfile from "../../components/UserProfile/UserProfile";
import { MdOutlineMonitor } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";
import { PiOfficeChairFill } from "react-icons/pi";

import styles from "./home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.home__container}>
      <UserProfile />
      <div className={styles.devices__container}>
        <div className={styles.device}>
          <div className={styles.device__icon}>
            <PiOfficeChairFill size={35} />
          </div>
          <div className={styles.device__info}>
            <p className={styles.pcs}>5</p>
            <p className={styles.pcs__used}>
              використовуються - <span>2</span>
            </p>
            <p className={styles.pcs__free}>
              вільні - <span>3</span>
            </p>
          </div>
          <div className={styles.moreinfo__container}>
            <Link to='chairs' className={styles.moreinfo__btn}>Детально</Link>
          </div>
        </div>
        <div className={styles.device}>
          <div className={styles.device__icon}>
            <MdOutlineMonitor size={35} />
          </div>
          <div className={styles.device__info}>
            <p className={styles.pcs}>50</p>
            <p className={styles.pcs__used}>
              використовуються - <span>15</span>
            </p>
            <p className={styles.pcs__free}>
              вільні - <span>34</span>
            </p>
          </div>
        </div>
        <div className={styles.device}>
          <div className={styles.device__icon}>
            <FaLaptopCode size={35} />
          </div>
          <div className={styles.device__info}>
            <p className={styles.pcs}>50</p>
            <p className={styles.pcs__used}>
              використовуються - <span>15</span>
            </p>
            <p className={styles.pcs__free}>
              вільні - <span>34</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
