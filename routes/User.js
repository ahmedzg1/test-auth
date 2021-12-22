const express=require("express");
const router= express.Router();
const User=require("../models/user")
const bcrypt = require("bcrypt")

//router.get("/",(req,res)=>{
    //res.send("hello world");
//});


// register
router.post("/register",async(req,res)=>{
    const { name ,lastName, email, password} = req.body;
    try {
        const newUser= new User({ name, lastName,email,password });
       const searchedUser = await User.findOne({email});
if(searchedUser){
    return res.status(400).send({msg: "email already exist"});
}



      const salt=10;
       const genSalt= await bcrypt.genSsalt(salt);
       const hashedPassWord= await bcrypt.hash(passWord,genSalt);
       console.log(hashedSalt) 
       newUser.passWord = hashedPassWord;
       await newUser.save();
        res.status(200).send({newUser, msg :"user is saved"})
        //save the user
    } catch (error) {
        res.status(500).send("can not save user");
    }
});
//login 
router.post("/login",async(req,res) => {

    const {email,passWord}=req.body;
try {
    const searchchedUser= await User.findOne({email});
  if(!searchedUser){
      return res.status(400).send({msg:"bad credential"})

  }
    const match=await bcrypt.compare(passWord,searchedUser.passWord);
    if(!match){
        return res.status(400).send({msg : "bad credential"});
    }
res.status(200).send({user:searchedUser,msg: "ok"})

} catch (error) {
    res.status(500).send({msg:"can not get the user"});

}
});




module.exports = router ;