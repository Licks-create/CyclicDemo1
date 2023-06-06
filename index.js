const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
app.use(morgan("tiny"));
const { writeFile, readFile } = require("fs");
const { json } = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
const people=require('./public/data')
var iData = 0;
readFile(path.resolve(__dirname, "Indata.json"), (err, res) => {
  iData = JSON.parse(res);
});

 
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
app.get("/get.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "get.html"));
});



app.post("/login", (req, res) => {
  const testing = req.body;
  console.log(testing); 
  if (testing) {
    if (iData.find((x) => x.Student === testing.Student))
      return res.status(200).send({
          Value: `Name Must be different so go back and fill the form again`,
        });
    else {
      iData.push(testing);
      writeFile(path.resolve(__dirname, "Indata.json"),JSON.stringify(iData),()=>{});
    }
    return res.status(200).redirect("/");
  }
  console.log("no body", req.body);
});

app.get('/test',(req,res)=>{
  res.send(people)
})
app.post("/getData", (req, res) => {
     const name=req.body.unique 
     if (found=iData.find((x) => x.Student === name)) {
        return res.status(200).json(found);
      }  
      else
      res.send("we have not found any!!")

      console.log(req.body);
      
});
app.get("/deleteAll",(req,res)=>{
  writeFile(path.resolve(__dirname, "Indata.json"),JSON.stringify([{name:"unknown"}]),()=>{
    res.send("MESSAGES DELETED")
  })
})
app.get("/getAll",(req,res)=>{
  readFile(path.resolve(__dirname, "Indata.json"), (err, result) => {
    iData = JSON.parse(result);
    res.json(iData)
  });
})
app.listen(9000,()=>{
  console.log("starting server on port 9000");
  
})