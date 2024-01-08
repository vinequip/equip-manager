import styles from './emptyList.module.css'

type TitleProp = {
    title: string;
}

function EmptyList({title}: TitleProp) {
  return (
    <div className={styles.empty__list}>
      {title}
    </div>
  )
}

export default EmptyList
