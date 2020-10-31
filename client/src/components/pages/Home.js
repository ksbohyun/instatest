import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import AppContext from "../../context/AppContext";

const Home = () => {
  const [files, setFile] = useState();
  const [error, setError] = useState();
  const { userData } = useContext(UserContext);
  const { setShowHeader } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    if (userData.user) {
      setShowHeader(true);
    } else if (!userData.user) {
      setShowHeader(false);
      history.push("/login");
    }
  });
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const loginUser = { email, password };
  //     const loginRes = await axios.post(
  //       "http://localhost:5000/users/login",
  //       loginUser
  //     );
  //     setUserData({
  //       token: loginRes.data.token,
  //       user: loginRes.data.user,
  //     });
  //     localStorage.setItem("auth-token", loginRes.data.token);
  //     history.push("/");
  //   } catch (err) {
  //     err.response.data.msg && setError(err.response.data.msg);
  //   }
  // };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }

      const uploadRes = await axios.post(
        "http://localhost:5000/content/upload",
        formData
      );
      console.log(uploadRes);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log(error);
    }
  };

  return (
    <>
      <div className="page"></div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files)}
        ></input>
        <input type="submit" value="전송"></input>
      </form>
    </>
  );
};

export default Home;
