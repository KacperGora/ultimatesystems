import React from "react";
import GlobalStyle from "./styles/global";

import Login from "./components/LoginPage/Login";
import Register from "./components/Register/Register";
import UsersList from "./components/UsersList/UsersList";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <UsersList />
  </>
);

export default App;
