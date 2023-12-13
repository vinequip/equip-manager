import { useState } from "react";
import styles from "./signUp.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slice/authSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import RegistrationContainer from "../../components/Registration/RegistrationContainer/RegistrationContainer";
import RegistrationBtn from "../../components/Registration/RegistrationBtn/RegistrationBtn";
import RegistrationInput from "../../components/Registration/RegistrationInput/RegistrationInput";

type UserInfoProp = {
  userEmail: string;
  userPassword: string;
  firstName: string;
  lastName: string;
  role: string;
};

function SignUp() {
  const [userInfo, setUserInfo] = useState<UserInfoProp>({
    userEmail: "",
    userPassword: "",
    lastName: "",
    firstName: "",
    role: "",
  });

  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const customersCollectionRef = collection(db, "customers");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    setErrorFirstName("")
    setErrorLastName("")
    setErrorEmail("");
    setErrorPassword("");
    setFirebaseError("");

    e.preventDefault();

    if (!userInfo.firstName){
      setErrorFirstName("Обо'язкове поля для заповнення")
      return
    }
    if (!userInfo.lastName){
      setErrorLastName("Обо'язкове поля для заповнення")
      return
    }
    if (!userInfo.userEmail){
      setErrorEmail("Обо'язкове поля для заповнення")
      return
    }
    if (!userInfo.userPassword){
      setErrorPassword("Обо'язкове поля для заповнення")
      return
    } 
    if (userInfo.userPassword.length < 6){
      setErrorPassword("Пароль має містити не менше 6 символів")
      return
    } 

    // if (
    //   !userInfo.userPassword ||
    //   !userInfo.userEmail ||
    //   !userInfo.firstName ||
    //   !userInfo.lastName
    // ) {
    //   setError("Need to add!");
    //   return;
    // }

    const addToDb = async (email: string | null, uid: string | null) => {
      await addDoc(customersCollectionRef, {
        userEmail: email,
        uid: uid,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        role: "customer",
      });
    };

    await createUserWithEmailAndPassword(
      auth,
      userInfo.userEmail,
      userInfo.userPassword
    )
      .then((response) => {
        const user = response.user;
        const email = user.email;
        const uid = user.uid;
        console.log("SingUp user ---> SUCCESS");
        addToDb(email, uid);
        dispatch(
          addUser({
            userEmail: user.email,
            uid: user.uid,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            role: "customer",
          })
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use'){
          setFirebaseError('Користувач з такою поштою вже існує');
        }
      });
  };

  console.log("userInfo --->", userInfo);
  return (
    <RegistrationContainer title="Реєстрація">
      <form className={styles.form__container} onSubmit={handleSubmit}>
        <RegistrationInput
          type="firstName"
          value={userInfo.firstName}
          setValue={(elem) => setUserInfo({ ...userInfo, firstName: elem })}
          error={errorFirstName}
          placeholder="Введіть ваше ім'я..."
          label="Ім'я"
        />
        <RegistrationInput
          type="lastName"
          value={userInfo.lastName}
          setValue={(elem) => setUserInfo({ ...userInfo, lastName: elem })}
          error={errorLastName}
          placeholder="Введіть ваше прізвище..."
          label="Прізвище"
        />
        <RegistrationInput
          type="email"
          value={userInfo.userEmail}
          setValue={(elem) => setUserInfo({ ...userInfo, userEmail: elem })}
          error={errorEmail}
          placeholder="Введіть вашу пошту..."
          label="Пошта"
        />
        <RegistrationInput
          type="password"
          value={userInfo.userPassword}
          setValue={(elem) => setUserInfo({ ...userInfo, userPassword: elem })}
          error={errorPassword}
          placeholder="Введіть ваш пароль..."
          label="Пароль"
        />
        <RegistrationBtn title="Зареєструватися" />
        <div className={styles.firebaseError__msg}>{firebaseError}</div>
      </form>
      <div className={styles.haveAccount}>
        <p className={styles.haveAccount__title}>Я вже маю обліковий запис.</p>
        <Link className={styles.login__link} to="/login">
          Вхід в систему
        </Link>
      </div>
    </RegistrationContainer>
  );
}

export default SignUp;
