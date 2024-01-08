import { useState } from "react";
import styles from "./createChair.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import useWorkers from "../../hooks/useWorkers";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import useGetChairs from "../../hooks/useGetChairs";

type WorkerProp = {
  id: string;
  firstName: string;
  lastName: string;
};

function CreateChair() {
  const [chairInventoryNo, setChairInventoryNo] = useState("");
  const [selectedWorker, setSelectedWorker] = useState<WorkerProp | null>(null);
  const navigate = useNavigate();
  const workers = useWorkers();
  const chairsCollectionRef = collection(db, "chairs");
  const [errorChairNo, setErrorChairNo] = useState("");
  const chairList = useGetChairs();

  const handleSelect = (selectedObject: WorkerProp | null) => {
    setSelectedWorker(selectedObject);
  };

  console.log("render!!!!-------------->")

  const createNew = async () => {
    setErrorChairNo("");
    const isInventoryNoUse = Boolean(
      chairList?.find((item) => item.inventoryNo == chairInventoryNo)
    );
    const workerId = selectedWorker?.id ? selectedWorker.id : "";
    const workerName =
      selectedWorker?.firstName && selectedWorker.lastName
        ? selectedWorker.lastName + " " + selectedWorker.firstName
        : "";

    if (!chairInventoryNo) {
      setErrorChairNo("Обов'язкове поле");
      return;
    }

    if (isInventoryNoUse) {
      setErrorChairNo("Даний інвентариний номер вже використовується");
      return;
    }

    try {
      await addDoc(chairsCollectionRef, {
        inventoryNo: chairInventoryNo,
        ownerId: workerId,
        ownerName: workerName,
      });
      navigate("/chairs");
    } catch (error) {
      console.log("Проблема додавання елементу", error);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Додати новий стілець</h1>
      <div className={styles.form__container}>
        <CustomInput
          type="number"
          value={chairInventoryNo}
          setValue={(elem) => setChairInventoryNo(elem)}
          error={errorChairNo}
          placeholder="Інвентарний номер ..."
          label="Інвентарний номер"
        />

        <CustomSelect
          options={workers || []}
          onSelect={handleSelect}
          title="Список працівників"
        />
        <CustomButton title="Додати" onClick={createNew} />
      </div>
    </div>
  );
}

export default CreateChair;
