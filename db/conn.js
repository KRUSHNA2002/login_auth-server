require('dotenv').config();
const mongoose=require("mongoose");


const DB="mongodb+srv://waghumbarekrushna143:12345@cluster0.zr9zcnn.mongodb.net/Authusers?retryWrites=true&w=majority&appName=Cluster0";



mongoose.connect(DB,{

    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{console.log("connection start")}).catch((error)=>{console.log(error.message)})