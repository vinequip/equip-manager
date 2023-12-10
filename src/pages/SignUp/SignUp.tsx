import { useState } from "react";
import styles from "./signUp.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../slice/authSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

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
    role: ""
  });
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const customersCollectionRef = collection(db, "customers");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !userInfo.userPassword ||
      !userInfo.userEmail ||
      !userInfo.firstName ||
      !userInfo.lastName
    ) {
      setError("Need to add!");
      return;
    }

    const addToDb = async (email: string | null, uid: string | null) => {
      await addDoc(customersCollectionRef, { userEmail: email, uid: uid, firstName: userInfo.firstName, lastName: userInfo.lastName, role: 'customer'})
    }

    await createUserWithEmailAndPassword(
      auth,
      userInfo.userEmail,
      userInfo.userPassword
    )
      .then((response) => {
        const user = response.user;
        const email = user.email
        const uid  = user.uid
        console.log("SingUp user ---> SUCCESS");
        addToDb(email, uid)
        dispatch(addUser({ userEmail: user.email, uid: user.uid, firstName: userInfo.firstName, lastName: userInfo.lastName, role: 'customer' }));
        navigate("/");
      })
      .catch((error) => setError(error.code));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}> Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your first name..."
          onChange={(e) =>
            setUserInfo({ ...userInfo, firstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Your last name..."
          onChange={(e) =>
            setUserInfo({ ...userInfo, lastName: e.target.value })
          }
        />
        <input
          type="text"
          name="email"
          placeholder="Your email..."
          onChange={(e) =>
            setUserInfo({ ...userInfo, userEmail: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Your password..."
          onChange={(e) =>
            setUserInfo({ ...userInfo, userPassword: e.target.value })
          }
        />
        <button type="submit">SignUp</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <Link to="/login">LOGIN</Link>
    </div>
  );
}

export default SignUp;
