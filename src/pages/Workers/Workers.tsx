import { collection, getDocs, query, where, QuerySnapshot, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

interface WorkerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other properties as needed
}

interface CustomerData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string
    // Add other properties as needed
  }
  

function Workers() {
  const [workers, setWorkers] = useState<WorkerData[] | null>(null);
  const [customers, setCustomers] = useState<CustomerData[] | null>(null);

  const userCollectionRef = collection(db, "workers");
  const customersCollectionRef = collection(db, "customers");

//   useEffect(() => {
//     const getCustomers = async () => {
//         try {
//           const data = await getDocs(customersCollectionRef);
//           const userData = data.docs.map((doc) => ({ id: doc.id, firstName: doc.data().firstName,  lastName: doc.data().lastName, email: doc.data().email, role: doc.data().role }));
      
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
    const getCustomers = async () => {
        try {
            const q = query(customersCollectionRef, where("role", "==", "customer"));
          const querySnapshot: QuerySnapshot<DocumentData > = await getDocs(q);
          const userData = querySnapshot.docs.map((doc) => ({ id: doc.id, firstName: doc.data().firstName,  lastName: doc.data().lastName, email: doc.data().email, role: doc.data().role }));
      
          if (userData.length > 0) {
            setCustomers(userData);
          } else {
            console.log('Дані відсутні');
          }
        } catch (error) {
          console.error('Помилка отримання даних:', error);
          // Обробка помилок
        }
      };
      getCustomers()
  }, [])

  useEffect(() => {
    const getUser = async () => {
      await getDocs(userCollectionRef)
        .then((resp) => {
          setWorkers(
            resp.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email,
            }))
          );
        })
        .catch((e) => console.log(e));
    };
    getUser();
  }, []);

  console.log("WORKERS -->", workers);
  
  console.log("customers -->", customers);

  return (
    <div>
      <div>Workers!</div>
      {workers?.length !== 0 ? <>{workers?.map((item) => <p key={item.email}>{item.firstName}</p>)}</> : <div></div>}
    </div>
  );
}

export default Workers;
