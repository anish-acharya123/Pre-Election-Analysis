const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const connectDb = require("./config/db");

connectDb();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", require("./Routes/userRoutes"));
app.use("/candidate", require("./Routes/candidateRoutes"));
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/votes", require("./Routes/voteRoutes"));
app.use("/api", require("./Routes/simpleAnalysis"));
app.use("/token", require("./Routes/tokencheckRoute"));

app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
