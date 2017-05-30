var path = require("path");
var scrape = require("../methods/scrape").scrape;
var saveArticle = require("../methods/bulkSave").saveArticles;
var Article = require("../models/article");

module.exports = function (app) {
  app.get("/", function (req, res) {
    scrape((data) => {
      saveArticle(data, 0, function(){
        Article.find({}, function(err, arts){
          if(err) throw err;
          else{
            res.render("index", {
              data: arts
            })
            console.log("Page rendered")
          }
        })
      })
    });
  });
};