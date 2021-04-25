//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require('lodash');

var postArray = [];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let pstArray;
  let postPath;
  res.render(__dirname + "/views/home.ejs", {
    pstArray: postArray
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
  let postObject = {
    pstTitle: req.body.postTitle,
    pstBody: req.body.postBody
  };
  postArray.push(postObject);
  res.redirect("/");
});

app.get("/posts/:Title", function(req, res) {
  var titleOfPost = lodash.replace(lodash.lowerCase(req.params.Title), ' ', '');
  postArray.forEach((item) => {
    var postItemTitle = lodash.replace(lodash.lowerCase(item.pstTitle), ' ', '');
    if (postItemTitle === titleOfPost) {
      res.render(__dirname + "/views/post.ejs", {
        postTitle2Display: item.pstTitle,
        postBody2Display: item.pstBody
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
