import React from "react";
import GlobalStyle from "./styles/global";

import Login from "./components/Auth/LoginPage/Login";
import Register from "./components/Auth/Register/Register";
import UsersList from "./components/UsersList/UsersList";
import Routers from "./routers/Routers";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Routers />
  </>
);

export default App;
