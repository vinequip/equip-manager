import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

type ChairsProp = {
  id: string;
  inventoryNo: string;
  ownerId: string;
  ownerName: string;
};

function useGetChairs() {
  const [chairsList, setChairsList] = useState<ChairsProp[] | null>(null);

  const chairsCollectionRef = collection(db, "chairs");

  useEffect(() => {
    const getChiars = async () => {
      try {
        const result = await getDocs(chairsCollectionRef);
        const list = result.docs.map((doc) => ({
          id: doc.id,
          inventoryNo: doc.data().inventoryNo,
          ownerId: doc.data().ownerId,
          ownerName: doc.data().ownerName,
        }));
        setChairsList(list);
      } catch (error) {
        console.error("Помилка запиту в getChairs:", error);
      }
    };
    getChiars();
  }, []);

  return chairsList;
}

export default useGetChairs;
