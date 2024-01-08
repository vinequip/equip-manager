import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

type WorkerDataProp = {
  id: string;
  firstName: string;
  lastName: string;
  //email: string;
  // Add other properties as needed
};

function useWorkers() {
  const [workers, setWorkers] = useState<WorkerDataProp[] | null>(null);

  const workersCollectionRef = collection(db, "workers");
  useEffect(() => {
    const getUser = async () => {
      await getDocs(workersCollectionRef)
        .then((resp) => {
          setWorkers(
            resp.docs.map((doc) => ({
              // ...doc.data(),
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              //email: doc.data().email,
            }))
          );
        })
        .catch((e) => console.log(e));
    };
    getUser();
  }, []);

  return workers;
}

export default useWorkers;
