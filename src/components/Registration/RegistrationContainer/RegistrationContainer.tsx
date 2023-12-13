import {ReactNode} from 'react'
import styles from "./registrationContainer.module.css";
import logo from "../../../assets/logoEM3.png";

type ContainerProp = {
  title: string;
  children: ReactNode;
}

function RegistrationContainer({ children, title }: ContainerProp) {
  return (
    <div className={styles.reg__container}>
      <div className={styles.logo__holder}>
        <img className={styles.logo} src={logo} alt="LOGO" />
      </div>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
}

export default RegistrationContainer;
