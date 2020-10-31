import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => {
    history.push("/register");
  };
  const login = () => {
    history.push("/login");
  };
  const Home = () => {
    history.push("/");
  };
  const Message = () => {
    history.push("/directmessage");
  };
  const Explore = () => {
    history.push("/Explore");
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <>
      <nav className="auth-options">
        {userData.user ? (
          <>
            <button onClick={Home}>집모양</button>
            <button onClick={Message}>비행기</button>
            <button onClick={Explore}>나침반</button>
            <button>하트</button>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={register}>회원가입</button>
            <button onClick={login}>로그인</button>
          </>
        )}
      </nav>
    </>
  );
};

export default AuthOptions;
