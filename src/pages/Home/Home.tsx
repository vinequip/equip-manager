import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { logOutUser } from "../../slice/authSlice";

interface UserData {
  id: string;
  email: string;
  uid: string;
  // Add other properties as needed
}

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData[] | null>(null);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();

  const userCollectionRef = collection(db, "users");
  const customersCollectionRef = collection(db, "customers");

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(userCollectionRef);
      setUser(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          email: doc.data().email,
          uid: doc.data().uid,
        }))
      );
    };
    getUser();
  }, []);

  const logOut = async () => {
    await signOut(auth);
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <>
      <div>Home</div>
      <div>{userEmail}</div>
      <div>{role}</div>
      <div>
        <button onClick={logOut}>LogOut</button>
      </div>
      <Link to="/workers">Workers</Link>
    </>
  );
}

export default Home;
