import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { logOutUser } from "../../redux/slice/authSlice";
import styles from "./home.module.css";

interface UserData {
  id: string;
  email: string;
  uid: string;
  // Add other properties as needed
}

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData[] | null>(null);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const role = useSelector((state: RootState) => state.auth.role);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const dispatch = useDispatch();

  const userCollectionRef = collection(db, "users");
  const customersCollectionRef = collection(db, "customers");

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(userCollectionRef);
      setUser(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          email: doc.data().email,
          uid: doc.data().uid,
        }))
      );
    };
    getUser();
  }, []);

  return (
    <div className={styles.home__container}>
      <div className={styles.userinfo__holder}>
        <div className={styles.user__info}>
          <p className={styles.info__title}>
            {firstName} {lastName}
          </p>
          <p className={styles.info__title}>{userEmail}</p>
          <p className={styles.info__title}>{role}</p>
        </div>
      </div>
      <div>Home</div>
    </div>
  );
}

export default Home;
