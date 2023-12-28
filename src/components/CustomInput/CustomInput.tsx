import React from "react";
import styles from "./customInput.module.css";

type InputProp = {
  type: string;
  value: string;
  error?: string;
  placeholder: string;
  label: string;
  setValue: (value: string) => void;
};

function CustomInput({
  type,
  value,
  setValue,
  error,
  placeholder,
  label,
}: InputProp) {
  return (
    <div className={styles.input__container}>
      <label className={styles.input__lable} htmlFor={type}>
        {label}
      </label>
      <input
        className={
          !error ? styles.input : [styles.input, styles.input__error].join(" ")
        }
        id={type}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <div className={styles.error__msg}>{error ? error : ""}</div>
    </div>
  );
}

export default CustomInput;
