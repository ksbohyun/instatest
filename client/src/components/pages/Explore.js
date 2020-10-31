import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../context/AppContext";
import UserContext from "../../context/UserContext";

const Explore = () => {
  const { userData } = useContext(UserContext);
  const { setShowHeader } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    if (!userData.user) {
      setShowHeader(false);
      history.push("/login");
    }
  });
  return (
    <>
      <h1>Explore</h1>
    </>
  );
};

export default Explore;
