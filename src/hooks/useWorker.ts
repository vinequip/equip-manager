import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { DocumentData, collection, getDoc, doc } from "firebase/firestore";

type WorkerProp = {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  idCard: string;
};

function useWorkerData(id: string) {
  const workersCollectionRef = collection(db, "workers");
  const [worker, setWorker] = useState<WorkerProp | null>(null);
  const getWorker = async () => {
    try {
      const workerDocRef = doc(workersCollectionRef, id);
      const workerSnapshot = await getDoc(workerDocRef);

      if (workerSnapshot.exists()) {
        const workerData: DocumentData = workerSnapshot.data();
        const typedWorkerData: WorkerProp = {
          firstName: workerData.firstName,
          lastName: workerData.lastName,
          email: workerData.email,
          tel: workerData.tel,
          idCard: workerData.idCard
        };
        setWorker(typedWorkerData);
      } else {
        console.log("Документ не знайдено");
      }
    } catch (error) {
      console.error("Помилка отримання робітника:", error);
    }
  };
  useEffect(() => {
    getWorker();
  }, []);

  return {worker, getWorker};
}

export default useWorkerData;
