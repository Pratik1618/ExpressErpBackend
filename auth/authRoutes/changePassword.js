const express = require('express')
const User = require('../userSchema')
const router = express.Router();

router.post('/verifyOtp',async(req,res)=>{
    const {email,otp} = req.query;
    const {password} = req.body;
    console.log(email,otp)

    try{
        const user =  await User.findOne({email});
console.log(user.Otp)
        if(!user){
            return res.status(400).json({message:"email not found"})
        }

        if(user.Otp !== otp){
            return res.status(400).json({message:"Invalid OTP"})
        }
       
        user.password = password;
        user.Otp = null;
        user.otpGeneratedAt = null;
       
     
        await user.save();

        return res.status(200).json({ message: "Psssword changed successfully" });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;