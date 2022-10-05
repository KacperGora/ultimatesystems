import React from "react";
import GlobalStyle from "./styles/global";

import Login from "./components/Auth/LoginPage/Login";
import Register from "./components/Auth/Register/Register";
import UsersList from "./components/UsersList/UsersList";


const App: React.FC = () => (
  <>
    <GlobalStyle />
    <UsersList />
  </>
);

export default App;
