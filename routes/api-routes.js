var path = require("path");
var Article = require("../models/article");
var articleComment = require("../models/comment");

module.exports = function (app) {
  app.post("/api/comment", function (req, res) {
    var article = req.body.article;
		var text = req.body.text;
		
		var newComment = new articleComment({
			article_title : article,
			text_body : text
		})

		newComment.save(function(err){
			if(err){
				res.redirect("/");
			}
			else{
				console.log("++++++++++++++++++++++++++ Posts Success");
				res.redirect('back');
			}
		})
  });

	app.delete("/comment", function(req, res){
		console.log("******************************** Deleting" + req.body.date);
		console.log("************" + Object.keys(req.body));

		var date = req.body.date;
		
		articleComment.find({
			date : date
		}).remove().exec();
	})
};