const express = require('express');
const app = express();
 
const PORT = 3000;
function handleListening(){
 console.log("listening on : http://localhost:${PORT}")
}

function handleHome(req, res){
  console.log(req);
  res.send('hello from home')
}
function handleProfile(req,res){
  res.send("profile page , routes.. html css file")
}

app.get("/", handleHome);
app.get("/profile",handleProfile);

app.listen(PORT,handleListening);