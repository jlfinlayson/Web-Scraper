// Require Express Package
var router = require("express").Router();
// Require Models 
var db = require("../models");
// Require Axios Package
var axios = require("axios");
// Require Cheerio Package
var cheerio = require("cheerio");
// Require Mongojs Package
var mongojs = require("mongojs");

//Home
router.get("/", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
      var hbsObject = {
          articles: dbArticle
      };
      res.render("index", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Scraping Website
router.get("/scrape", function(req, res) {
    axios.get("https://www.altpress.com/news/").then(function(response) {

    var $ = cheerio.load(response.data);

    $(".td_module_10").each(function(i, element) {

      var result = {};

      result.title = $(this)
        .children(".item-details")
        .children("h3")
        .text();

      result.link = $(this)
        .children(".item-details")
        .children("h3")
        .children("a")
        .attr("href");

      result.summary = $(this)
        .children(".item-details")
        .children(".td-excerpt")
        .text();

      result.image = $(this)
        .children(".td-module-thumb")
        .children("a")
        .children("img")
        .attr("currentSrc");

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  });
});

//All scraped articles
router.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
      var hbsObject = {
          articles: dbArticle
      };
      res.render("index", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Saved Articles
router.get("/saved", function(req, res) {
  db.Article.find({saved:true})
    .then(function(dbArticle) {
      var hbsObject = {
          articles: dbArticle
      };
      res.render("saved", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Mark Article as Saved
router.post("/saved/:id",
function (req,res) {
  db.Article.updateOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
        saved: true
      },
    }).then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Mark Article as Removed
router.post("/remove/:id",
function (req,res) {
  db.Article.updateOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
        saved: false
      },
    }).then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Grab Article for Comments
router.get("/articles/:id", function (req, res) {

  db.Article.findOne(
    { _id: req.params.id })
    .populate("comment")
    .then(function (dbArticle) {
      // If any Libraries are found, send them to the client with any associated Books
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

//Add Comment
router.post("/articles/:id", function (req, res) {
  db.Comment.create(req.body)
  .then(function(dbComment){
    return db.Article.findOneAndUpdate({
      _id: req.params.id
    },
    { $push: { comment: dbComment._id } },
    { new: true });
  })
  .then(function (dbArticle) {
    res.json(dbArticle);
  })
  .catch(function (err) {
    res.json(err);
  });
});

//Remove Comment

//Clear Articles
router.get("/clear", function(req, res) {
  db.Article.deleteMany({}, function(err,response) {
    if (err) {
      console.log(err);
      response.send(err);
    }
    else {
      res.send(response);
    };
  });
});


// Exports Router Information
module.exports = router;