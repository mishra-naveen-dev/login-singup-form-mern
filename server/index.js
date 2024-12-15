const express = require("express");
const UserAuthRouter = require("./routers/UserAuthRouter");
const dbConnect = require("./lib/dbConnect");

const app = express();
app.use(express.json());
require("dotenv").config();

// app.get("/", (req, res) => {
//     return res.send(`<h1>hello bro</h1>`);
// })

//routes
app.use("/user", UserAuthRouter);


dbConnect();
app.listen(4000, () => {
    console.log("http://localhost:4000");

});