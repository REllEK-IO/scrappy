var path = require("path");
scrape = require("../methods/scrape").scrape

module.exports = function (app) {
  app.get("/", function (req, res) {
    scrape((data)=>{
      console.log(data);
      res.render("index", {
        data : data
      });
    });
  });
};