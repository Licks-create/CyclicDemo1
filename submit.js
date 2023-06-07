var iData;
const Router=require('express')()
const user=require('./user')
const multer=require('multer')
const path=require('path')

Router.post("/",async (req, res) => {
    const testing = req.body;
  
    console.log(testing); 
    console.log(req.file); 
    iData=await user.find();
    if (testing) {
      if (iData.find((x) => x.StName === testing.Student))
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
        // costumer.id=testing.Student+testing.Age;
      }
    
      return res.status(200).redirect(`back`); 
    }
    // console.log("no body", req.body);
  });
  module.exports=Router