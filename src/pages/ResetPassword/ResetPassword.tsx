import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import RegistrationContainer from "../../components/Registration/RegistrationContainer/RegistrationContainer";
import RegistrationBtn from "../../components/Registration/RegistrationBtn/RegistrationBtn";
import { IoReturnDownBack } from "react-icons/io5";

import styles from "./resetPassword.module.css";
import RegistrationInput from "../../components/Registration/RegistrationInput/RegistrationInput";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function ResetPassword() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState("");
  const customersCollectionRef = collection(db, "customers");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorEmail("");
    if (!userEmail) {
      setErrorEmail("Обо'язкове поля для заповнення");
    }
    if (userEmail) {
      const email = query(
        customersCollectionRef,
        where("userEmail", "==", userEmail)
      );
      const isEmailUsed: QuerySnapshot<DocumentData> = await getDocs(email);
      console.log("пошта відсутня в базі -->", isEmailUsed.empty);
      if (isEmailUsed.empty) {
        setErrorEmail("Дана пошта відсутня у базі користувачів");
        return;
      }
    }
    if (userEmail) {
      await sendPasswordResetEmail(auth, userEmail)
        .then((response) => {
          navigate("/login");
          console.log("email SEND-->");
        })
        .catch((error) => console.log("error reset -> ", error.code));
    }
  };
  return (
    <RegistrationContainer title="Відновлення паролю">
      <form className={styles.form__container} onSubmit={handleSubmit}>
        <div>
          <RegistrationInput
            type="email"
            value={userEmail}
            setValue={(elem) => setUserEmail(elem)}
            error={errorEmail}
            placeholder="email"
            label="Пошта"
          />
        </div>
        <RegistrationBtn title="Надіслати Лист" />
      </form>
      <p className={styles.reset__instruction}>
        Для відновлення пароля потрібно ввести існуючу пошту  на яку буде
        надісланий лист з інструкцією по зміні пароля для Вашого облікового
        запису.
      </p>
      <Link className={styles.back__btn} to="/login">
        <IoReturnDownBack size={25} /> повернутись
      </Link>
    </RegistrationContainer>
  );
}

export default ResetPassword;
