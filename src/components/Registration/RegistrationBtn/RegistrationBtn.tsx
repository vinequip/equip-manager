import styles from './registrationBtn.module.css'

type BtnProp = {
    title: string;
}
function RegistrationBtn({title}: BtnProp) {
  return (
    <button className={styles.send__btn} type="submit">{title}</button>
  )
}

export default RegistrationBtn
