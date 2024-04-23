/**const express = require("express")
const path = require("path")

const app = express();

app.get("/", (req, res)=>{
   // res.sendFile("C:/Users/bety/Desktop/ws/challenge_nexu_backend/index.html")
   res.sendFile(path.join(__dirname + "/index.html"))
})



//puesto que se esta escuchando
app.listen(3000, ()=>{
    console.log("server runnin on puerto ", 3000)
})**/