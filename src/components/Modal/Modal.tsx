import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import styles from "./modal.module.css";

type modalProp = {
  isOpenModal: boolean;
  onClose: () => void;
  action: () => void;
  changeData: {
    fieldType: string;
    fieldData: string;
  }
  setChangeData: (data: { fieldType: string; fieldData: string }) => void
};

const Modal = ({ isOpenModal, onClose, action, changeData, setChangeData}: modalProp) => {
    // console.log('changeData---->', changeData)
  const actionClose = () => {
    action();
    onClose();
  };
  return (
    <div>
      {isOpenModal && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <p className={styles.modal__title}>{changeData.fieldType}</p>
            <CustomInput 
               type="email"
               value={changeData.fieldData}
               setValue={(elem) => setChangeData({...changeData, fieldData: elem})}
               error={''}
               placeholder="Інвентарний номер ..."
               label="Інвентарний номер"
               />
            <div className={styles.btn__container}>
              <CustomButton title="Відмінити" onClick={onClose} />
              <CustomButton title="Змінити" onClick={actionClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Modal;
