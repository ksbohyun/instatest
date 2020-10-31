const router = require("express").Router();
const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    // 입력 확인
    if (!title) {
      return res.status(400).json({ msg: "입력되지 않은 항목이 있습니다." });
    }
    const newTodo = new Todo({
      title,
      userId: req.user,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user });
  res.json(todos);
});

router.delete("/:id", auth, async (req, res) => {
  const todo = await Todo.findOne({ userId: req.user, _id: req.params.id });
  if (!todo) {
    return res.status(400).json({ msg: "해당하는 데이터가 없습니다." });
  }
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

module.exports = router;
