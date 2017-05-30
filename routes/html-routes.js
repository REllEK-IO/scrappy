var path = require("path");
var scrape = require("../methods/scrape").scrape;
var scrapeSum = require("../methods/scrape").scrapeSum;
var saveArticle = require("../methods/bulkSave").saveArticles;
var Article = require("../models/article");
var articleComment = require("../models/comment");

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
    articleComment.find({
      article_title: target
    }, function (err, comments) {
      Article.find({
        title: target
      }, function (err, art) {
        if (err) throw err;
        else {
          var articleLink = art[0].link;
          // console.dir(articleLink);
          if (articleLink === undefined) {
            res.redirect("/");
          } else {
            scrapeSum(articleLink, function (summary) {
              console.log(summary.length);
              res.render("article", {
                data: art[0],
                summary: summary,
                comments: comments
              });
            })
          }
        }
      })
    });
  })
};