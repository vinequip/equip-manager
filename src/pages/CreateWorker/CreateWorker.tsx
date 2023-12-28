import { useState } from "react";
import styles from "./createWorker.module.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import RegistrationBtn from "../../components/Registration/RegistrationBtn/RegistrationBtn";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

type UserInfoProp = {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
};

function CreateWorker() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfoProp>({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
  });
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const wockersCollectionRef = collection(db, "workers");

  const createNewWorker = async () => {
    try {
      await addDoc(wockersCollectionRef, {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        tel: userInfo.tel,
      });
      navigate("/workers");
    } catch (error) {
      console.log("Проблема додавання елементу", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorFirstName("");
    setErrorLastName("");
    if (userInfo.firstName.length === 0) {
      setErrorFirstName("Обов'язкове поле");
      return;
    }
    if (userInfo.lastName.length === 0) {
      setErrorLastName("Обов'язкове поле");
      return;
    }
    createNewWorker();
  };

  return (
    <section>
      <h1 className={styles.createWorker__title}>Додати нового працівника</h1>
      <form className={styles.form__container} onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          value={userInfo.firstName}
          setValue={(elem) => setUserInfo({ ...userInfo, firstName: elem })}
          error={errorFirstName}
          placeholder="Iм'я працівника ..."
          label="Ім'я"
        />
        <CustomInput
          type="text"
          value={userInfo.lastName}
          setValue={(elem) => setUserInfo({ ...userInfo, lastName: elem })}
          error={errorLastName}
          placeholder="Прізвище працівника ..."
          label="Прізвище"
        />
        <CustomInput
          type="email"
          value={userInfo.email}
          setValue={(elem) => setUserInfo({ ...userInfo, email: elem })}
          // error={errorLastName}
          placeholder="Пошта працівника ..."
          label="Пошта"
        />
        <CustomInput
          type="tel"
          value={userInfo.tel}
          setValue={(elem) => setUserInfo({ ...userInfo, tel: elem })}
          // error={errorLastName}
          placeholder="Телефон працівника +380..."
          label="Телефон"
        />
        <RegistrationBtn title="Додати працівника" />
      </form>
    </section>
  );
}

export default CreateWorker;
