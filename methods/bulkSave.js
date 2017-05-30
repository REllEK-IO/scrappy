var Article = require("../models/article");

module.exports = (function () {

	var recursiveArticleSave = function (data, i, cb) {
		if (i < data.length) {
			Article.findOneAndUpdate({
				title : data[i].title
			}, {
				title : data[i].title,
				link : data[i].link
			}, {upsert:true}, function (err, doc) {
				if(err) throw err;
				else{
					console.log(doc);
					i++;
					recursiveArticleSave(data, i, cb)
				}
			});
		}
		else{
			cb();
		}
	}

	return {
		saveArticles: recursiveArticleSave
	}
})();