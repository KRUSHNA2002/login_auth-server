const express = require("express");
const userdb = require("../models/userSchema");
const bcrypt=require("bcrypt");
const router = new express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body);

    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the details." });
    }

    try {
        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            return res.status(422).json({ error: "This email already exists" });
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Password does not match" });
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });

            const storeData = await finalUser.save();
            console.log(storeData);

            // return res.status(201).json({status:201,storeData });
        }
    } catch (error) {
        console.log("Catch block error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login',async (req,res)=>{

    const { email, password } = req.body;

    console.log(req.body.email);

    if (!email || !password) {
        return res.status(422).json({ error: "Fill all the details." });
    }

    try {
        const userValid=await userdb.findOne({email:email})

        if(userValid)
        {
            const ismatch=await bcrypt.compare({password:userValid.password});

            if(!ismatch)
            {
                res.status(422).json({error:"password not match"});
            }
            else{
                const token=await userValid.generateAuthtoken();

                console.log(token);
            }
        }
    } catch (error) {
        res.status(422).json({error:"not found"});
    }
})

module.exports = router;
