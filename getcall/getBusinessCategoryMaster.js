const express =require('express');
const router = express.Router();
const BusinessSchema = require('../model/BusinessData');

router.get('/category',async(req,res)=>{
    try{
        const business = await BusinessSchema.find({isDeleted:{$ne:true}});
        res.json(business);
        console.log(business)
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});
module.exports = router;

