import styles from './customButton.module.css'

type BtnProp = {
    title: string;
    onClick: () => void
}

function CustomButton({title, onClick}: BtnProp) {
  return (
    <button className={styles.custom__btn} type="submit" onClick={onClick}>{title}</button>
  )
}

export default CustomButton
