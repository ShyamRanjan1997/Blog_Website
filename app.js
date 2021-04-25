//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require('lodash');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BlogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const postSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      let pstArray;
      res.render(__dirname + "/views/home.ejs", {
        pstArray: posts
      });
    }
  });
});

app.get("/contact", function(req, res) {
  let contactContentthis;
  res.render(__dirname + "/views/contact.ejs", {
    contactContentthis: contactContent
  });
});

app.get("/about", function(req, res) {
  let aboutContentthis;
  res.render(__dirname + "/views/about.ejs", {
    aboutContentthis: aboutContent
  });
});

app.get("/compose", function(req, res) {
  res.render(__dirname + "/views/compose.ejs");
});

app.post("/compose", function(req, res) {
  const newPost = new Post({
    title: req.body.postTitle,
    body: req.body.postBody
  });
  newPost.save();
  res.redirect("/");
});

app.get("/posts/:Title", function(req, res) {
  Post.findOne({
    title: req.params.Title
  }, function(err, post) {
    if (err) {
      console.log(err)
    } else {
      res.render(__dirname + "/views/post.ejs", {
        postTitle2Display: post.title,
        postBody2Display: post.body
      });
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
