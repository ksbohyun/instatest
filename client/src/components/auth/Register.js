import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";

const Register = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [displayName, setDisplayName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.user) {
      history.push("/");
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, name, displayName, password };
      await axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="page">
        <h2>Register</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={onSubmit}>
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="register-name">Name</label>
          <input
            id="register-name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="register-displayName">displayName</label>
          <input
            id="register-displayName"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="가입" />
        </form>
      </div>
    </>
  );
};

export default Register;
