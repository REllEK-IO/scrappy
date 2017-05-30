var path = require("path");
var scrape = require("../methods/scrape").scrape;
var scrapeSum = require("../methods/scrape").scrapeSum;
var saveArticle = require("../methods/bulkSave").saveArticles;
var Article = require("../models/article");

module.exports = function (app) {
  app.get("/", function (req, res) {
    scrape((data) => {
      saveArticle(data, 0, function () {
        Article.find({}, function (err, arts) {
          if (err) throw err;
          else {
            res.render("index", {
              data: arts
            })
            console.log("Page rendered")
          }
        })
      })
    });
  });
  app.get("/article/:title", function (req, res) {
    var target = req.params.title;
    console.log("Article: " + target + " is loading...");
    Article.find({
      title: target
    }, function (err, art) {
      if (err) throw err;
      else {
        for (var k in art) {
          console.log(art[k]);
        }
        var articleLink = art;
        // console.dir(articleLink);
        scrapeSum(articleLink, function (summary) {
          res.render("article", {
            data: art,
            summary: summary
          });
        })
      }

    });
  })
};