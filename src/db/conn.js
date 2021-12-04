//connection with the database

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogdb",{
    //this is just no deprivation error come
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection`);
})