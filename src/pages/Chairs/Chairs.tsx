import React, { useEffect, useState } from "react";
import styles from "./chairs.module.css";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { PiOfficeChairFill } from "react-icons/pi";
import { TiDeleteOutline } from "react-icons/ti";
import useGetChairs from "../../hooks/useGetChairs";
import EmptyList from "../../components/EmptyList/EmptyList";
import Loader from "../../components/Loader/Loader";

function Chairs() {
  const chairsList = useGetChairs();
  const [free, setFree] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const ownsFilteredList = free
    ? chairsList?.filter((item) => !item.ownerId)
    : chairsList;
  const nameFilteredList =
    search && !free
      ? ownsFilteredList?.filter((item) =>
          item.ownerName.toLowerCase().includes(search.toLowerCase())
        )
      : ownsFilteredList;

  console.log("nameFilteredList --->", nameFilteredList);

  return (
    <>
      <section className="holder">
        <h1 className={styles.title}>Стільці</h1>
        <div className={styles.control__holder}>
          <div>
            пошук
            <input
              type="text"
              disabled={free}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
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
        </div>
        <div className={styles.link__container}>
          <Link to="/chairs/create" className={styles.add__link}>
            <div className={styles.add__holder}>
              <div className={styles.add__icon}>
                <PiOfficeChairFill size={20} />
              </div>
              <div className={styles.add__title}>додати</div>
            </div>
          </Link>
        </div>
        {nameFilteredList?.length === 0 ? (
          <EmptyList title="Не знайдено жодного елементу даного обладнання" />
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
                  <Link to={`/chair/${item.id}`} className={styles.chair__edit}>
                    <IoSettingsOutline size={17} />
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      {!chairsList && <Loader />}
    </>
  );
}

export default Chairs;
