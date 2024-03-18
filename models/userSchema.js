const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const keysecret="krushnawaghumbarewaghumbarekrush";


const userSchema=mongoose.Schema({
    fname:{
        type:"String",
        required:true,
        trim:true
    },

    email:{
        type:"String",
        required:true,
        trim:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("not valid Email");
            }
        }
    },

    password:{
        type:"String",
        required:true,
        minlength:6
    },

    cpassword:{
        type:"String",
        required:true,
        minlength:6
    },

    tokens:[{

        token:{
            type:"String",
            required:true
        }
    }]

})



// password hashing

userSchema.pre("save" , async function(next){
    this.password=await bcrypt.hash(this.password,12),
    this.cpassword=await bcrypt.hash(this.cpassword,12)

    next();
})

// generate token

userSchema.methods.generateAuthtoken=async function(){

    try {
        let token11=jwt.sign({_id:this._id},keysecret,{
            expiresIn:"1d"
        });

        this.tokens=this.tokens.concat({token:token11});
        await this.save();
        return token11;

    } catch (error) {
        
        res.status(422).json(error);
    }
}
// creating model

var userdb=new mongoose.model("users",userSchema);

module.exports=userdb;