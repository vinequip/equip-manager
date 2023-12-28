import React, { useState } from "react";
import styles from "./createChair.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import useWorkers from "../../hooks/useWorkers";
import CustomInput from "../../components/CustomInput/CustomInput";

type WorkerProp = {
  id: string;
  firstName: string;
  lastName: string;
};

type SelectProps = {
  options: WorkerProp[];
  onSelect: (selectedOption: WorkerProp | null) => void;
};

const SelectComponent: React.FC<SelectProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<WorkerProp | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedObject =
      options.find((option) => option.id === selectedId) || null;
    setSelectedOption(selectedObject);
    onSelect(selectedObject);
  };

  return (
    <select
      value={selectedOption ? selectedOption.id : ""}
      onChange={handleChange}
    >
      <option value="" disabled>
        Оберіть працівника
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {`${option.firstName} ${option.lastName}`}
        </option>
      ))}
    </select>
  );
};

function CreateChair() {
  const [chairInventoryNo, setChairInventoryNo] = useState("");
  const [selectedWorker, setSelectedWorker] = useState<WorkerProp | null>(null);
  const navigate = useNavigate();
  const chairsCollectionRef = collection(db, "chairs");
  const [workers] = useWorkers();
  const [errorChairNo, setErrorChairNo] = useState('')

  const handleSelect = (selectedObject: WorkerProp | null) => {
    setSelectedWorker(selectedObject);
  };

  const createNew = async () => {
    const workerId = selectedWorker?.id ? selectedWorker.id : "";
    const workerName =
      selectedWorker?.firstName && selectedWorker.lastName
        ? selectedWorker.lastName + " " + selectedWorker.firstName
        : "";
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
        <label htmlFor="invNo">inventoryNo</label>
        <SelectComponent options={workers || []} onSelect={handleSelect} />
        <button onClick={createNew}>CREATE</button>
      </div>
    </div>
  );
}

export default CreateChair;
