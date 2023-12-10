import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import PrivateRoute from "./utils/route/PrivateRoute";
import Home from "./pages/Home/Home";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Workers from "./pages/Workers/Workers";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/workers" element={<Workers />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
