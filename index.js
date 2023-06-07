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
var iData; 
app.use('/login',require('./submit'))
mongoose.set('strictQuery', true); 
const main=async function () {
  try{

    let x=await mongoose.connect(process.env.MONGO_URI);
    return x;
  }
  catch(err)
  {
    process.exit(1);    
  }
}

app.get('/test',async(req,res)=>{
  res.send(await user.find())
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
app.post("/deleteAll",async (req,res)=>{

  if(req.body.password==='goluojha')
 { try{
   const data = await user.deleteMany({})
   console.log('started',req.body);
   res.json({message:"all deleted"})
  } catch(err)
  {
    console.log(err.message); 
  }}
  else
  res.send("Wrong Password")
  })


app.post("/getAll",async (req,res)=>{
  if(req.body.password==='goluojha')
  try{
   const data = await user.find({},{_id:0,__v:0})
   console.log('started');
   res.json(data)
  } catch(err)
  { 
    console.log(err.message); 
  } 

  else
  res.send("Wrong Password")
  
  })

main().then((x)=>{
  app.listen(PORT,()=>{
    console.log("starting server on port ",PORT);
  })
  
  console.log('we are connected bro')
}).catch(err => console.log(err));