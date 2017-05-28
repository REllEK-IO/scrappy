var request = require("request");
var cheerio = require("cheerio");

module.exports = (function () {

	var scrape = function (cb) {
		request("https://www.technologyreview.com/", function (error, response, html) {

			// Load the HTML into cheerio and save it to a variable
			// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
			var $ = cheerio.load(html);

			// An empty array to save the data that we'll scrape
			var result = [];

			// With cheerio, find each p-tag with the "title" class
			// (i: iterator. element: the current element)
			$("div.hp-daily__tz__hgroup").each(function (i, element) {

				// Save the text of the element (this) in a "title" variable
				var title = $(this).find("h2").text()

				// In the currently selected element, look at its child elements (i.e., its a-tags),
				// then save the values for any "href" attributes that the child elements may have
				var link = "https://www.technologyreview.com" + $(element).children().attr("href")

				// Save these results in an object that we'll push into the result array we defined earlier
				result.push({
					title: title,
					link: link
				});

			});

			$("div.grid-tz__hgroup").each(function (i, element) {

				// Save the text of the element (this) in a "title" variable
				var title = $(this).find("h2").text()
				title = title.replace("\n", "");
				title = title.replace("\t", "");
				// In the currently selected element, look at its child elements (i.e., its a-tags),
				// then save the values for any "href" attributes that the child elements may have
				var link = "https://www.technologyreview.com" + $(element).find("a").attr("href")
				
				// Save these results in an object that we'll push into the result array we defined earlier
				result.push({
					title: title,
					link: link
				});

			});

			// Log the result once cheerio analyzes each of its selected elements
			console.log(result);
			cb(result)
		});

	}

	return {
		scrape : scrape
	}
})();