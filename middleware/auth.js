const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // 토큰 여부 확인
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "토큰이 존재하지 않습니다." });
    }
    // 토큰 검증
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ msg: "토큰인증이 불가합니다. " });
    }
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
