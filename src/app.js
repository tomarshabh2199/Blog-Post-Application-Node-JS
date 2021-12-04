const express = require("express");
const assert = require('assert')
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const BlogData = require("./models/blogdata");
const mongo = require("mongoose");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

console.log(`static_path ${static_path}`);
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json()); //if postman have return the result
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("start")
})

app.get("/register", (req, res) => {
    res.render("register")

})

app.get("/login", (req, res) => {
    res.render("login")

})

app.get("/editBlog", (req, res) => {
    res.render("editBlog")

})

app.get('/get-data', function (req, res, next) {
    var resultArray = [];
    mongo.connect("mongodb://localhost:27017/blogdb", function (err, db) {

        var cursor = db.collection('blog_datas').find();
        cursor.forEach(function (data, err) {
            var resultData = [];
            console.log("Id ---" + data._id);
            resultData.push(data.title);
            resultData.push(data.category);
            resultData.push(data.content);
            resultData.push(data._id);


            resultArray.push(resultData);
        }, function () {
            db.close();
            console.log("resultArray ---" + resultArray);
            res.render('getBlogData', { items: resultArray });
        })

    })
})
//update and edit blog
// app.post('/update',function(req,res,next){
//     var item={
//         title:req.body.title,
//         category:req.body.category,
//         content:req.body.content


//     }
//var id=req.body.id;
//  mongo.connect("mongodb://localhost:27017/blogdb", function (err, db) {
//      assert.equal(null,err);
//      db.collection('user_datas').updatetOne({"_id":objectId(id)},{$set:item},function(err,result){
//          assert.equal(null,err);
//          console.log('item updated');
//          db.close();
//      })
// })




//delete and remove blog
// app.post('/delete',function(req,res,next){
//
//var id=req.body.id;
//  mongo.connect("mongodb://localhost:27017/blogdb", function (err, db) {
//      assert.equal(null,err);
//      db.collection('user_datas').deletetOne({"_id":objectId(id)},function(err,result){
//          assert.equal(null,err);
//          console.log('item deleted');
//          db.close();
//      })
// })

app.get("/logout", (req, res) => {
    res.render("start")

})

app.post("/homepage", async (req, res) => {
    try {
        console.log(req.body.name);
        console.log(req.body.password);
        const password = req.body.password;
        const name = req.body.name;

        Register.findOne({ name: name, password: password },
            function (err, register) {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                }
                if (!register) {
                    res.status(404).send();
                }
                console.log("homepage");
                res.render("homepage")
            })

    }
    catch (error) {
        res.status(400).send(error);
    }
})

app.get("/reduxblog", (req, res) => {
    res.render("reduxblog")

})

app.post("/blogPost", (req, res) => {
    console.log(req.body.title);
    console.log(req.body.category);
    console.log(req.body.content);

    const registerBlog = new BlogData({
        title: req.body.title,
        category: req.body.category,
        content: req.body.content
    })
    const registeredBlog = registerBlog.save();
    res.render("homepage")

})

app.get("/newblog", (req, res) => {
    res.render("newblog")

})

app.get("/es6blog", (req, res) => {
    res.render("es6blog")

})

app.get("/programmingblog", (req, res) => {
    res.render("programmingblog")

})

app.get("/jsblog", (req, res) => {
    res.render("jsblog")

})


app.post("/register", async (req, res) => {
    try {
        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.confirmpassword);
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            const registered = await registerEmployee.save();
            res.status(201).send(start);
        }
        else {
            res.send("password are not matching");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})