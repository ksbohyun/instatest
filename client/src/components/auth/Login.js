import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
// import ErrorNotice from "../misc/ErrorNotice";
import Slider from "react-slick";
import "../scss/Login.scss";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.user) {
      history.push("/");
    }
  });

  const register = () => {
    history.push("/register");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log(error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    fade: true,
    arrows: false,
  };

  return (
    <>
      <div className="login">
        {/* 인스타 로그인단 가이드라인 w=1200px // 플랫폼 w= 930px */}
        <div className="login--wrap">
          <div className="login--left">
            <div className="login--left__phone">
              <img src="/index/img_phone.png" alt="인스타 모바일버전" />

              <div className="login--left__phoneBg">
                {/* Slider 플러그인 적용 */}
                <Slider {...settings}>
                  <div>
                    <img src="/index/img_phone_bg01.jpg" alt="" />
                  </div>
                  <div>
                    <img src="/index/img_phone_bg02.jpg" alt="" />
                  </div>
                  <div>
                    <img src="/index/img_phone_bg03.jpg" alt="" />
                  </div>
                  <div>
                    <img src="/index/img_phone_bg04.jpg" alt="" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
          <div className="login--right">
            {/* ------ 아이디 비밀번호 로그인 및 비번 찾기 페이스북 연동 ------ */}
            {/* {error && (
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
              />
            )} */}
            <form className="login--form" onSubmit={onSubmit}>
              <h1 className="logo">
                <img src="/index/logo.png" alt="logo" />
                <p className="blind">HBJstagram</p>
              </h1>
              <div className="login--user">
                <input
                  id="login-email"
                  type="text"
                  className="login--user__info"
                  placeholder="전화번호, 사용자 이름 또는 이메일"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  id="login-password"
                  type="password"
                  className="login--user__info"
                  placeholder="비밀번호"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="submit"
                  className="login--user__btn"
                  value="로그인"
                />
              </div>
              <div className="login--help">
                <p className="login--help__or">또는</p>

                <button type="button" className="login__facebook">
                  <span>Facebook으로 로그인</span>
                </button>

                <p className="login--help__pwSearch">
                  <a href="#this">비밀번호를 잊으셨나요?</a>
                </p>
              </div>
            </form>
            {/* ------ // 아이디 비밀번호 로그인 및 비번 찾기 페이스북 연동 ------ */}

            {/* ------------ 가입하기 버튼 ------------ */}
            <form className="login--join login--form">
              <p className="login--join__go">
                <strong>계정이 없으신가요?</strong>
                {/* <Link to="/accounts/Join">가입하기</Link> */}
                <span onClick={register}>회원가입</span>
              </p>
            </form>
            {/* ------------ //가입하기 버튼 ------------ */}

            {/* ------------ 앱 다운로드 ------------ */}
            <div className="login--app">
              <strong>앱을 다운로드하세요.</strong>
              <a href="#this">
                <img
                  src="/index/logo_appstore_full.png"
                  alt="앱스토어에서 다운로드하기"
                />
              </a>
              <a href="#this">
                <img
                  src="/index/logo_google_full.png"
                  alt="구글 플레이어에서 다운로드하기"
                />
              </a>
            </div>
            {/* ------------ //앱 다운로드 ------------ */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
