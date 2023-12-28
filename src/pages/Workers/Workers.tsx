import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { BsFillPersonLinesFill } from "react-icons/bs";

import styles from "./workers.module.css";
import useWorkers from "../../hooks/useWorkers";
import Loader from "../../components/Loader/Loader";

function Workers() {
  const userRole = useSelector((state: RootState) => state.auth.role);
  const [workers] = useWorkers();

  return (
    <>
      {workers !== null  ? (
        <div className="holder">
          <div className={styles.workers__list}>
            <div className={styles.workers__title}>
              <BsFillPersonLinesFill size={20} />
              список працівників
            </div>
            {workers?.map((item) => (
              <Link key={item.id} to={`/workers/${item.id}`}>
                <div className={styles.worker__holder}>
                  <p className={styles.worker__info}>
                    {item.firstName} {item.lastName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {userRole === "admin" && <Link to="/workers/create">Create</Link>}
        </div>
      ) : (
        <Loader />
      )}
    </>

  );
}

export default Workers;
