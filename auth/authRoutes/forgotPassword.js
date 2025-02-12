const crypto = require('crypto');
const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../userSchema');
const { error } = require('console');
const router = express.Router()


const transporter = nodemailer.createTransport({
   service:"Gmail",
    auth:{
        user:"kadampratik18@gmail.com",
        pass:"ktzh slri sieu tquo"
    },
    logger: true, // Enable debug logging
    debug: true,
})

router.post('/forgot-password',async(req,res)=>{
    const {email} = req.query;
    console.log(email)

    try{
        const user = await User.findOne({email})
        if(!user){
            
            return res.status(400).json({message:"email not founf"})
        }
        const otp = crypto.randomInt(100000, 999999).toString();

        const mailOptions = {
            from: `"no@reply" <kadampratik18@gmail.com>`, // Your email
            to: email,  // Recipient email
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
          };


          transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.error('Error sending OTP:', error); 
                return res.status(500).json({message:"error sending otp"})
            }

            user.Otp = otp;
            user.otpGeneratedAt = new Date()
           
            user.save();
            
            res.status(200).json({message:`OTP sent successfully,${otp}`})
          })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    
})

module.exports = router;