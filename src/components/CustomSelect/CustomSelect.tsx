import { useState } from "react";
import styles from "./customSelect.module.css";

type WorkerProp = {
  id: string;
  firstName: string;
  lastName: string;
};

type SelectProps = {
  options: WorkerProp[];
  onSelect: (selectedOption: WorkerProp | null) => void;
  title: string;
};

const CustomSelect: React.FC<SelectProps> = ({ options, onSelect, title }) => {
  const [selectedOption, setSelectedOption] = useState<WorkerProp | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedObject =
      options.find((option) => option.id === selectedId) || null;
    setSelectedOption(selectedObject);
    onSelect(selectedObject);
  };

  return (
    <>
      <label className={styles.select__title}>{title}</label>
      <select
        className={styles.select}
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
    </>
  );
};

export default CustomSelect;
