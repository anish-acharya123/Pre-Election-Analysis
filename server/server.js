const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const connectDb = require("./config/db");

connectDb();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", require("./Routes/userRoutes"));
app.use("/candidate", require("./Routes/candidateRoutes"));
app.use("/admin", require("./Routes/adminRoutes"));

app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
