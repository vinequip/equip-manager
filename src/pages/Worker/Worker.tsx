import { useState } from "react";
import { useParams } from "react-router-dom";
import useWorkerData from "../../hooks/useWorker";

import styles from "./worker.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import Modal from "../../components/Modal/Modal";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Loader from "../../components/Loader/Loader";

type changeProp = {
  fieldType: string;
  fieldData: string;
};

function Worker() {
  const { id } = useParams();
  const { worker, getWorker } = useWorkerData(id || "");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeData, setChangeData] = useState<changeProp>({
    fieldType: "",
    fieldData: "",
  });

  const action = async () => {
    if (!id) {
      console.log("ERROR --> No ID workers");
      return;
    }
    try {
      setLoading(true);
      const userDoc = doc(db, "workers", id);
      const newField = { email: changeData.fieldData };
      await updateDoc(userDoc, newField);
      await getWorker();
      setLoading(false);
    } catch (error) {
      console.log("Update Error", error);
      setLoading(false);
    }
  };

  if (loading || !worker) {
    return <Loader />;
  }
  return (
    <div className="holder">
      <h1 className={styles.worker__name}>
        {worker?.firstName} {worker?.lastName}
      </h1>
      <h2 className={styles.worker__infoTitle}>Особиста інформація:</h2>
      <div className={styles.worker__infoHolder}>
        <button
          className={styles.setting__btn}
          onClick={() => {
            setIsOpenModal(true);
            setChangeData({
              fieldType: "Зміна пошти працівника",
              fieldData: worker?.email ?? "",
            });
          }}
        >
          <IoSettingsOutline size={20} />
        </button>
        <div className={styles.worker__info}>
          <span>Електронна адреса - </span>
          {worker?.email || "інформація відсутня"}
        </div>
      </div>
      <div className={styles.worker__infoHolder}>
        <button className={styles.setting__btn}>
          <IoSettingsOutline size={20} />
        </button>
        <div className={styles.worker__info}>
          <span>Телефон - </span>
          {worker?.tel || "інформація відсутня"}
        </div>
      </div>
      <h2 className={styles.worker__infoTitle}>Обладнання:</h2>
      <div className={styles.worker__info}>
        <span>ID-картка - </span>
        {worker?.tel || "інформація відсутня"}
      </div>
      <div className={styles.worker__info}>
        <span>Стілець - </span>
        {worker?.tel || "інформація відсутня"}
      </div>
      <Modal
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        action={action}
        changeData={changeData}
        setChangeData={setChangeData}
      />
    </div>
  );
}

export default Worker;
