const express = require('express')
const router = express.Router()
const User = require('../userSchema')

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid email or password'});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid email or password'})
        }

        res.status(200).json({message:"login successfull"});
    }catch(error){
        console.error(error)
        res.status(500).json({message:'Server Error'})
    }
})

module.exports = router;
