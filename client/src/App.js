import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import UserContext from "./context/UserContext";

// import "./style.css";
import "./components/scss/_Reset.scss";
import DirectMessage from "./components/pages/DirectMessage";
import AppContext from "./context/AppContext";
import Explore from "./components/pages/Explore";

function App() {
  const [showHeader, setShowHeader] = useState(false);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <AppContext.Provider value={{ showHeader, setShowHeader }}>
            {showHeader && (
              <>
                <Header />
              </>
            )}
            <div className="container">
              <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/directmessage" component={DirectMessage} />
                <Route path="/Explore" component={Explore} />
              </Switch>
            </div>
          </AppContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
