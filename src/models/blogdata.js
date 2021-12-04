const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    
    content: {
        type: String,
        required: true
    }

})

//now we need to create a collection
const BlogRegister = new mongoose.model("blog_data", blogSchema);
module.exports = BlogRegister;
