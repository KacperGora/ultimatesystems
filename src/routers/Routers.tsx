import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/LoginPage/Login";
import Register from "../components/Auth/Register/Register";
import UsersList from "../components/UsersList/UsersList";

const Routers = () => {
  return (
    <Routes>
      <Route element={<Register />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<UsersList />} path="/list" />
    </Routes>
  );
};
export default Routers;
