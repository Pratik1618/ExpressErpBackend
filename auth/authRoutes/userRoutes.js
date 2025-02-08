const express = require('express')
const User = require('../userSchema')
const router = express.Router();


router.post('/create/user',async(req,res)=>{
    try{
        const {email,password} =req.body;
        const newUser = new User({email,password})
        await newUser.save()
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
      }
})

module.exports =router