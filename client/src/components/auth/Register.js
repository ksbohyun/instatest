import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../scss/Register.scss";
import Slider from "react-slick";

const Register = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [displayName, setDisplayName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const login = () => {
    history.push("/login");
  };

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
      console.log(error);
    }
  };

  // slider 환경설정
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
      <div className="join">
        {/* 인스타 로그인단 가이드라인 w=1200px // 플랫폼 w= 930px */}
        <div className="join--wrap">
          <div className="join--left">
            <div className="join--left__phone">
              <img src="/index/img_phone.png" alt="인스타 모바일버전" />
            </div>

            <div className="join--left__phoneBg">
              <Slider {...settings}>
                <img src="/index/img_phone_bg01.jpg" alt="인스타 유저 피드" />
                <img src="/index/img_phone_bg02.jpg" alt="인스타 피드 게시물" />
                <img src="/index/img_phone_bg03.jpg" alt="인스타 사진 업로드" />
              </Slider>
            </div>
          </div>
          <div className="join--right">
            {/* {error && (
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
              />
            )} */}
            <form className="join--form" onSubmit={onSubmit}>
              <h1 className="logo">
                <img src="/index/logo.png" alt="인스타그램" />
              </h1>
              <h2 className="join--title">
                친구들의 사진과 동영상을 보려면
                <br />
                가입하세요.
              </h2>

              <div className="join--help">
                <button
                  type="button"
                  className="join__facebook join--user__btn"
                >
                  <span>Facebook으로 로그인</span>
                </button>

                <p className="join--help__or">또는</p>
              </div>
              <div className="join--user">
                <input
                  id="register-email"
                  type="email"
                  className="join--user__info"
                  placeholder="휴대폰 번호 또는 이메일 주소"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  id="register-name"
                  type="text"
                  className="join--user__info"
                  placeholder="성명"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  id="register-displayName"
                  type="text"
                  className="join--user__info"
                  placeholder="사용자 이름"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                  id="register-password"
                  type="password"
                  className="join--user__info"
                  placeholder="비밀번호"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" className="join--user__btn" value="가입" />
              </div>
              <p className="join--agree">
                가입하면 Instagram의{" "}
                <b>
                  약관, 데이터 정책 및 쿠키
                  <br />
                  정책
                </b>
                에 동의하게 됩니다.
              </p>
            </form>
            <form className="join--join join--form">
              <p className="join--join__go">
                <strong>계정이 있으신가요?</strong>
                <span onClick={login}>로그인</span>
              </p>
            </form>
            <div className="join--app">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
