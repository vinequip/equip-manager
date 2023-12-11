import {useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { db } from "../../firebase/firebase";
import { DocumentData, QuerySnapshot, collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore';

type WorkerProp = {
    firstName: string;
    lastName: string;
}
function Worker() {
    const workersCollectionRef = collection(db, "workers");
    const {id} = useParams()
    const [worker, setWorker] = useState<WorkerProp | null>(null)
    
    useEffect(() => {
        const getWorker = async () => {
          try {
            const workerDocRef = doc(workersCollectionRef, id);
            const workerSnapshot = await getDoc(workerDocRef);

            if (workerSnapshot.exists()) {
              const workerData: DocumentData= workerSnapshot.data();
              const typedWorkerData: WorkerProp = {
                firstName: workerData.firstName,
                lastName: workerData.lastName,
              };
              setWorker(typedWorkerData)
            } else {
              console.log('Документ не знайдено');
            }
          } catch (error) {
            console.error('Помилка отримання робітника:', error);
          }
        };
        getWorker();
      }, [id]);
    
  return (
    <div>
      <div>{worker?.firstName}</div>
      <div>{worker?.lastName}</div>
    </div>
  )
}

export default Worker
