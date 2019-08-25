var router = require("express").Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var mongojs = require("mongojs");

//Home
router.get("/", function(req, res) {

});

//Data
router.get("/all", function(req, res) {

});

//Scraping Website
router.get("/scrape", function(req, res) {

});

//All scraped articles
router.get("/articles", function(req, res) {

});

//Saved Articles
router.get("/saved", function(req, res) {

});

//Clear Articles
router.get("/clear", function(req, res) {

});

module.exports = router;