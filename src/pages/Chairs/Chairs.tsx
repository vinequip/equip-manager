import React, { useEffect, useState } from "react";
import styles from "./chairs.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { PiOfficeChairFill } from "react-icons/pi";

type ChairsProp = {
  id: string;
  inventoryNo: string;
  ownerId: string;
  ownerName: string;
};

function Chairs() {
  const [chairsList, setChairsList] = useState<ChairsProp[] | null>(null);

  const [free, setFree] = useState<boolean>(false);
  const [search, setSearch] = useState('')
  
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
        console.error("Error fetching data:", error);
      }
    };
    getChiars();
    console.log("CHAIRSLIST --->", chairsList);
  }, []);

  const ownsFilteredList = free ? chairsList?.filter((item) => (!item.ownerId)) : chairsList;
  const nameFilteredList = (search && !free) ? ownsFilteredList?.filter((item) => ((item.ownerName).toLowerCase()).includes(search.toLowerCase())) : ownsFilteredList 

  console.log('nameFilteredList --->', nameFilteredList)


  return (
    <section className="holder">
      <h1 className={styles.title}>Стільці</h1>
      <div className={styles.control__holder}>
        <div>пошук
          <input type='text' disabled={free} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
        </div>
        <div>
          <label htmlFor="owner">вілні</label>
          <input
            type="checkbox"
            id="owner"
            value={free.toString()}
            checked={free}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFree(e.target.checked);
            }}
          />
        </div>
        <div>
          <Link to="/chairs/create">
            додати <PiOfficeChairFill size={20} />
          </Link>
        </div>
      </div>
      {nameFilteredList?.length === 0 ? (
        <p>Empty LIst</p>
      ) : (
        <>
          <div className={styles.chairs__container}>
            <p>
              інвентарний
              <br /> номер
            </p>
            {nameFilteredList?.map((item) => (
              <div key={item.id} className={styles.chair__holder}>
                <div className={styles.chair__inventory}>
                  {item.inventoryNo}
                </div>
                {item.ownerId ? (
                  <div className={styles.chair__owner}>{item.ownerName}</div>
                ) : (
                  <div className={styles.chair__owner}>вільний</div>
                )}
                <Link to="#" className={styles.chair__edit}>
                  <IoSettingsOutline size={20} />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Chairs;
