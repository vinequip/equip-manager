import {
  collection,
  getDocs,
  query,
  where,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState,  } from "react";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { BsFillPersonLinesFill } from "react-icons/bs";

import styles from './workers.module.css'

type WorkerData = {
  id: string;
  firstName: string;
  lastName: string;
  //   email: string;
  // Add other properties as needed
}

interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // Add other properties as needed
}

function Workers() {
  const [workers, setWorkers] = useState<WorkerData[] | null>(null);
  //   const [customers, setCustomers] = useState<CustomerData[] | null>(null);
  const userRole = useSelector((state: RootState) => state.auth.role);

  const workersCollectionRef = collection(db, "workers");
  const customersCollectionRef = collection(db, "customers");

  // useEffect(() => {
  //     const getCustomers = async () => {
  //         try {
  //             const q = query(customersCollectionRef, where("role", "==", "customer"));
  //           const querySnapshot: QuerySnapshot<DocumentData > = await getDocs(q);
  //           const userData = querySnapshot.docs.map((doc) => ({ id: doc.id, firstName: doc.data().firstName,  lastName: doc.data().lastName, email: doc.data().userEmail, role: doc.data().role }));

  //           if (userData.length > 0) {
  //             setCustomers(userData);
  //           } else {
  //             console.log('Дані відсутні');
  //           }
  //         } catch (error) {
  //           console.error('Помилка отримання даних:', error);
  //           // Обробка помилок
  //         }
  //       };
  //       getCustomers()
  //   }, [])

  useEffect(() => {
    const getUser = async () => {
      await getDocs(workersCollectionRef)
        .then((resp) => {
          setWorkers(
            resp.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              //   email: doc.data().email,
            }))
          );
        })
        .catch((e) => console.log(e));
    };
    getUser();
  }, []);

  console.log("WORKERS -->", workers);

  //   console.log("customers -->", customers);

  return (
    <div className="holder">
      <h2 className={styles.workers__title}>список працівників</h2>

      {workers?.length !== 0 ? (
        <div className={styles.workers__list}>
         <BsFillPersonLinesFill size={45} color='var(--main-white)'/>
          {workers?.map((item) => (
            <Link key={item.id} to={`/workers/${item.id}`}>
              <div className={styles.worker__holder}>
                <p  className={styles.worker__info}>{item.firstName} {item.lastName}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <></>
      )}
      {userRole === "admin" && <Link to="/workers/create">Create</Link>}
    </div>
  );
}

export default Workers;
