var router = require("express").Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
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
        .attr("src");

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

});

//Clear Articles
router.get("/clear", function(req, res) {

});

module.exports = router;