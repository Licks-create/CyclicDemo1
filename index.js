require('dotenv').config();
const PORT= process.env.PORT||3000
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(morgan("tiny"));
const { writeFile, readFile } = require("fs");
const { json } = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
const people=require('./public/data')
const user=require('./user')
var iData = 0;
readFile(path.resolve(__dirname, "Indata.json"), (err, res) => {
  iData = JSON.parse(res);
});
mongoose.set('strictQuery', true);
const main=async function () {
  try{

    let x=await mongoose.connect(process.env.MONGO_URI);
    // console.log(`Mongo connected ${conn.connection.host}`)
    return x;
  }
  catch(err)
  {
    console.log(err);
    process.exit(1);    
  }
}

try{

  const u1=new user({
    StName:"vivek",StGender:"male",
    address:{
      state:"UP",
      city:"ddu"
    }
  })
  u1.save().then(()=>{console.log('saeved',u1)})

}
catch(err){
  console.log(err.message);  
}



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
      const u1=new user({
        StName:testing.Student,StGender:testing.gender,
        address:{
          state:"UP",
          city:testing.selectedCity
        }
      })
      u1.save()
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


app.post("/getData", async(req, res) => {
     const name=req.body.unique 
     const found=await user.find({StName:name},{_id:0})
     if (found.length) {
        return res.status(200).send(found);
      }  
      else
      res.send("we have not found any!!")

      console.log(req.body);
      
});
app.get("/deleteAll",async (req,res)=>{
  try{
   const data = await user.deleteMany({})
   console.log('started');
   res.json({message:"all deleted"})
  } catch(err)
  {
    console.log(err.message); 
  }
  })



app.get("/getAll",async (req,res)=>{
  try{
   const data = await user.find({},{_id:0,__v:0,address:{_id:0}})
   console.log('started');
   res.json(data)
  } catch(err)
  {
    console.log(err.message); 
  }
  })

main().then((x)=>{
  app.listen(PORT,()=>{
    console.log("starting server on port ",PORT);
  })
  
  console.log('we are connected bro')
}).catch(err => console.log(err));