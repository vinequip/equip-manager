import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase";
import { addUser, logOutUser } from "../../slice/authSlice";
import { DocumentData, QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customersCollectionRef = collection(db, "customers");


    const getCustomers = async (userUid:string) => {
        try {
            const q = query(customersCollectionRef, where("uid", "==", userUid));
          const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
          const userData = querySnapshot.docs.map((doc) => ({ id: doc.id, firstName: doc.data().firstName,  lastName: doc.data().lastName, email: doc.data().userEmail, role: doc.data().role, uid: doc.data().uid }));
      
          if (userData.length > 0) {
            // console.log('userData --->', userData)
             dispatch(addUser({ userEmail: userData[0].email, firstName: userData[0].firstName, lastName: userData[0].lastName, uid: userData[0].uid, role: userData[0].role }));
             navigate("/");
          } else {
            console.log('Дані відсутні');
          }
        } catch (error) {
          console.error('Помилка отримання даних:', error);
          // Обробка помилок
        }
      };
     


  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUid = user.uid
      getCustomers(userUid)
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      userInfo.userEmail,
      userInfo.userPassword
    ).then(() => {
      const userUid = auth.currentUser?.uid
      if (userUid){
        getCustomers(userUid)
      }
    })
    .catch((error) => console.log("errorFirebase -->", error.code));
  };

  const logOut = async () => {
    await signOut(auth);
    dispatch(logOutUser())
    navigate("/login");
  };

  return (
    <div className="container">
      <div className={styles.login}>
        <div className={styles.title}>Login</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name..."
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
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">Sign Up</Link>
      </div>
      <button onClick={logOut}>LLLLLLLOGOOOT</button>
    </div>
  );
}

export default Login;
