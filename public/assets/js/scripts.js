$(document).ready(function () {
	console.log("***init***");
	$("#submit").click(function () {
		var text = $("#text").val();
		console.log(text.length);
		if (text.length >= 25) {
			var data = {
				article: $("#article").text(),
				text: text
			}
			$("#submit").off();
			$.ajax({
				type: "POST",
				url: "../api/comment",
				data: data
			});
			setTimeout(function () {
				location.reload();
			}, 1000)
		} else {
			$("#text").effect("shake");
			$("#text").addClass("has-danger");
			$("#short").removeClass("hidden");
		}
	})
	$(".delete").click(function () {
		var date = $(this).attr("val");
		console.log(date);
		var data = {
			date: date
		};
		$(this).off();
		$.ajax({
			type: "DELETE",
			url: "../comment",
			data: data
		});
		setTimeout(function () {
			location.reload();
		}, 1000)
	});
});