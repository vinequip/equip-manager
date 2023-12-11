import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import PrivateRoute from "./utils/route/PrivateRoute";
import RoleRoute from "./utils/route/RoleRoute"
import Home from "./pages/Home/Home";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Workers from "./pages/Workers/Workers";
import Layout from "./components/Layout/Layout";
import Worker from "./pages/Worker/Worker";
import CreateWorker from "./pages/CreateWorker/CreateWorker";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="workers" element={<Workers />} />
            <Route path="workers/:id" element={<Worker />} />
            <Route element={<RoleRoute/>}>
              <Route path="workers/create" element={<CreateWorker />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
