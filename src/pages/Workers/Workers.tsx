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

interface WorkerData {
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
    <div>
      <h1 style={{ textAlign: "center", padding: "20px" }}>Workers!</h1>
      {workers?.length !== 0 ? (
        <>
          {workers?.map((item) => (
            <Link key={item.id} to={`/workers/${item.id}`}>
              <div style={{ background: "green", margin: "5px" }}>
                <p>І'мя - {item.firstName}</p>
                <p>Прізвище - {item.lastName}</p>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <></>
      )}
      {userRole === "admin" && <Link to="/workers/create">Create</Link>}
    </div>
  );
}

export default Workers;
