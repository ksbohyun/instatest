const router = require("express").Router();
const auth = require("../middleware/auth");
const Content = require("../models/contentModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "image");
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    callback(null, basename + "_" + Date.now() + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    file: 3,
    fileSize: 1024 * 1024 * 1024,
  },
});

router.post("/upload", upload.array("file", 10), async (req, res) => {
  try {
    //   console.log(req.file);
    const { files } = req.body;
    const newContent = new Content({
      files,
    });
    const saveContent = await newContent.save();
    res.json(saveContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.post("/", auth, async (req, res) => {
//   try {
//     const { file, title } = req.body;
//     // 입력 확인
//     if (!file) {
//       return res.status(400).json({ msg: "사진을 첨부해주세요." });
//     }
//     const newContent = new Content({
//       file,
//       title,
//       userId: req.user,
//     });
//     const saveContent = await newContent.save();
//     res.json(saveContent);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get("/all", auth, async (req, res) => {
//   const todos = await Todo.find({ userId: req.user });
//   res.json(todos);
// });

// router.delete("/:id", auth, async (req, res) => {
//   const todo = await Todo.findOne({ userId: req.user, _id: req.params.id });
//   if (!todo) {
//     return res.status(400).json({ msg: "해당하는 데이터가 없습니다." });
//   }
//   const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
//   res.json(deletedTodo);
// });

module.exports = router;
