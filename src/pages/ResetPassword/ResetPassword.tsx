import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { auth } from "../../firebase/firebase";

function ResetPassword() {

    const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      await sendPasswordResetEmail(auth, email).then((response) => {
        navigate('/login')
        console.log("email SEND-->");
      }).catch((error) => console.log('error reset -> ', error.code));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">reset passwor</button>
      </form>
    </div>
  );
}

export default ResetPassword;
