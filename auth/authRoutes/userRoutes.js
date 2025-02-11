const express = require('express')
const User = require('../userSchema')
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   service:"Gmail",
    auth:{
        user:"kadampratik18@gmail.com",
        pass:"ktzh slri sieu tquo"
    },
    logger: true, // Enable debug logging
    debug: true,
})

router.post('/create/user',async(req,res)=>{
    try{
        const {email,password} =req.body;
        const newUser = new User({email,password})
        await newUser.save()
        const mailOptions = {
            from: "no@reply", // Your email
            to: email,  // Recipient email
            subject: 'Account Created Successfully',
            text: `Your email: ${email}, Your password: ${password} `,
          };


          transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.error('Account creation fail', error); 
                return res.status(500).json({message:"Account creation fail"})
            }
            res.status(200).json({message:`Account created Successfully  successfully,${otp}`})

      
          })
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
      }
})

module.exports =router