import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import RegistrationContainer from "../../components/Registration/RegistrationContainer/RegistrationContainer";
import RegistrationBtn from "../../components/Registration/RegistrationBtn/RegistrationBtn";
import { IoReturnDownBack } from "react-icons/io5";

import styles from "./resetPassword.module.css";
import RegistrationInput from "../../components/Registration/RegistrationInput/RegistrationInput";

function ResetPassword() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorEmail("");
    if (!userEmail) {
      setErrorEmail("Обо'язкове поля для заповнення");
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
        <div className={styles.input__container}>
          <RegistrationInput
            type="email"
            value={userEmail}
            setValue={(elem) => setUserEmail(elem)}
            error={errorEmail}
            placeholder="email"
            label="Пошта"
          />
          {/* <label className={styles.input__lable} htmlFor="email">
            Пошта
          </label>
          <input
            className={
              !errorEmail
                ? styles.input
                : [styles.input, styles.input__error].join(" ")
            }
            id="email"
            type="email"
            value={userEmail}
            placeholder="Введіть вашу пошту..."
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <div className={styles.error__msg}>
            {errorEmail ? errorEmail : ""}
          </div> */}
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
