import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slice/authSlice";

import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

import RegistrationContainer from "../../components/Registration/RegistrationContainer/RegistrationContainer";
import RegistrationBtn from "../../components/Registration/RegistrationBtn/RegistrationBtn";
import RegistrationInput from "../../components/Registration/RegistrationInput/RegistrationInput";

import styles from "./login.module.css";

type UserInfoProp = {
  userEmail: string;
  userPassword: string;
};

console.log("AUTH -->", auth);

function Login() {
  const [userInfo, setUserInfo] = useState<UserInfoProp>({
    userEmail: "",
    userPassword: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customersCollectionRef = collection(db, "customers");

  const getCustomers = async (userUid: string) => {
    try {
      const q = query(customersCollectionRef, where("uid", "==", userUid));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        email: doc.data().userEmail,
        role: doc.data().role,
        uid: doc.data().uid,
      }));

      if (userData.length > 0) {
        dispatch(
          addUser({
            userEmail: userData[0].email,
            firstName: userData[0].firstName,
            lastName: userData[0].lastName,
            uid: userData[0].uid,
            role: userData[0].role,
          })
        );
        navigate("/");
      } else {
        console.log("Дані відсутні");
      }
    } catch (error) {
      console.error("Помилка отримання даних:", error);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUid = user.uid;
      getCustomers(userUid);
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorEmail("");
    setErrorPassword("");
    setFirebaseError("");

    if (userInfo.userEmail.length === 0) {
      setErrorEmail("Обо'язкове поля для заповнення");
      return;
    }

    if (userInfo.userPassword.length < 6) {
      setErrorPassword("Пароль має містити не менше 6 символів");
      return;
    }

    await signInWithEmailAndPassword(
      auth,
      userInfo.userEmail,
      userInfo.userPassword
    )
      .then(() => {
        const userUid = auth.currentUser?.uid;
        if (userUid) {
          getCustomers(userUid);
        }
      })
      .catch((error) => {
        console.log("errorFirebase -->", error.code);
        if (error.code === "auth/invalid-credential") {
          setFirebaseError("Сталася помилка. Введено некоректні дані.");
        }
      });
  };

  return (
    <RegistrationContainer title="Вхід у систему">
      <form className={styles.form__container} onSubmit={handleSubmit}>
        <div className={styles.input__container}>
          <RegistrationInput
            type="email"
            value={userInfo.userEmail}
            setValue={(elem) => setUserInfo({ ...userInfo, userEmail: elem })}
            error={errorEmail}
            placeholder="Введіть вашу пошту..."
            label="Пошта"
          />
        </div>
        <div className={styles.input__container}>
          <RegistrationInput
            type="password"
            value={userInfo.userPassword}
            setValue={(elem) =>
              setUserInfo({ ...userInfo, userPassword: elem })
            }
            error={errorPassword}
            placeholder="Введіть ваш пароль..."
            label="Пароль"
          />
        </div>
        <RegistrationBtn title="Увійти" />
        <div className={styles.firebaseError__msg}>{firebaseError}</div>
      </form>
      <div className={styles.forgetPassword}>
        <p className={styles.forgetPassword__title}>Забули пароль?</p>
        <Link className={styles.forgetPassword__link} to="/reset-password">
          Відновити пароль
        </Link>
      </div>
      <div className={styles.forgetPassword}>
        <p className={styles.forgetPassword__title}>Немає облікового запису?</p>
        <Link className={styles.createUser__link} to="/signup">
          Зареєструватися
        </Link>
      </div>
    </RegistrationContainer>
  );
}

export default Login;
