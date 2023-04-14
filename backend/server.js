const express = require("express");
const app = express();
require("./database/connection")
const userRouter = require("./routes/user")

app.use(express.json())
app.use("/upload",express.static("./upload"))
app.use(userRouter);


app.listen(5000, ()=>{
    console.log("Running on Port 5000")
})