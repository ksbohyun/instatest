const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

// 익스프레스 설정
const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`listening on server on port : ${PORT}`));

// 몽구스 설정
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("mongodb 연결");
  }
);

// 라우트 설정
app.use("/users", require("./routes/userRouter"));
app.use("/todos", require("./routes/todoRouter"));
app.use("/content", require("./routes/contentRouter"));
