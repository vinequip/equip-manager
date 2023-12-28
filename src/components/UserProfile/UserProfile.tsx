// import {useEffect, useState} from 'react'
import { collection } from "firebase/firestore";
import styles from "./userProfile.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
// import { db } from "../../firebase/firebase";


// NEED CLEAr THIS FILE!!!!!

function UserProfile() {
    // const [user, setUser] = useState<UserData[] | null>(null);
    const userEmail = useSelector((state: RootState) => state.auth.userEmail);
    const role = useSelector((state: RootState) => state.auth.role);
    const lastName = useSelector((state: RootState) => state.auth.lastName);
    const firstName = useSelector((state: RootState) => state.auth.firstName);

    // const customersCollectionRef = collection(db, "customers");
//   useEffect(() => {
//     const getUser = async () => {
//       const data = await getDocs(userCollectionRef);
//       setUser(
//         data.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//           email: doc.data().email,
//           uid: doc.data().uid,
//         }))
//       );
//     };
//     getUser();
//   }, []);
  return (
    <div className={styles.userinfo__holder}>
      <div className={styles.user__info}>
        <p className={styles.info__title}>
          {firstName} {lastName}
        </p>
        <p className={styles.info__title}>{userEmail}</p>
        <p className={styles.info__title}>{role}</p>
      </div>
    </div>
  );
}

export default UserProfile;
