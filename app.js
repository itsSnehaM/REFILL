const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
require('dotenv').config();
const nodemailer = require("nodemailer");

// http://localhost:3000/blog

//--------db connection ------------
const password  = process.env.mongopassword;
mongoose.connect("mongodb+srv://amit-samui:" + password + "@cluster0.nuddc.mongodb.net/blogdb" , {useNewUrlParser: true});

const postSchema = {
  blogTitle: String,
  blogContent: String,
  blogName: String,
  blogEmail: String
}

const Post = mongoose.model("Post" , postSchema);

//--------- db connection end----------


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("main");
});



// ---------------------------------blog section --------------------- 



app.get("/blog" , (req , res) => {

  Post.find({} , (err , posts) => {
    if(err){console.log(err)}
    else{
      res.render("blog" , {blogs : posts} );
    }
    
  })
  
  

})

app.post("/blog" , (req , res) => {
  const body = req.body;

  const post = new Post({
    blogTitle: body.blogTitle,
    blogContent: body.blogContent,
    blogName: body.blogName,
    blogEmail: body.blogEmail
  })

  post.save();

  res.redirect("/blog")
})



app.listen(process.env.PORT || 3000 , () => {
  console.log("the server is running at port 3000");
})

