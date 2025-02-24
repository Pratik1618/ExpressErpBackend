const cron = require('node-cron');
const User = require('../userSchema')

async function expireOtp() {
 //need to optimize
    console.log('cron job started');
    cron.schedule('*/1 * * * *',async()=>{
        try {
            const currentTime = Date.now();
            const otpValidityPeriod = 300000;

            const usersWithOtp = await User.find({Otp :{$ne:null},otpGeneratedAt:{$ne:null}});


            for (const user of usersWithOtp){
                const otpGeneratedTime = user.otpGeneratedAt.getTime();

                if(currentTime - otpGeneratedTime >= otpValidityPeriod){
                    user.Otp = null;
                    user.otpGeneratedAt = null;
                    await user.save();
                    console.log(`OTP for user ${user.email} has expired and nullified`)
                }
            }
        }catch(error){
            console.error('error expiring otp',error)
        }
    });
}

module.exports = expireOtp;