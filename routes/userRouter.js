const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/useModel");
const auth = require("../middleware/auth");

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { email, name, displayName, password } = req.body;
    // 입력 확인
    if (!email || !password || !displayName || !name) {
      return res.status(400).json({ msg: "입력되지 않은 항목이 있습니다." });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: "비밀번호를 6자 이상 입력해주세요." });
    }
    // 기존사용자 확인
    const existingEmail = await User.findOne({ email: email });
    const existingDisplayName = await User.findOne({
      displayName: displayName,
    });
    if (existingEmail) {
      return res.status(400).json({ msg: "이미 존재하는 이메일입니다." });
    } else if (existingDisplayName) {
      return res.status(400).json({ msg: "이미 존재하는 사용자입니다." });
    }
    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // DB에 회원 저장
    const newUser = new User({
      email,
      name,
      displayName,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // 입력 확인
    if (!email || !password) {
      return res.status(400).json({ msg: "입력되지 않은 항목이 있습니다." });
    }
    // 유저의 유무 확인
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "존재하지 않는 이메일 입니다." });
    }
    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
    }
    // 토큰 생성
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 인증
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    // 토큰 여부
    if (!token) {
      return res.json(false);
    }
    // 올바른 토큰 여부
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }
    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    name: user.name,
    displayName: user.displayName,
    email: user.email,
  });
});

module.exports = router;
