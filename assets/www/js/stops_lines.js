$(function() {

	$('#stop-name').text(decodeURI($.urlParam('stop_name')));
	Mobee.Api.getLinesFromStop($.urlParam('stop_id'), updateLines);
	
	$("#retornar").click(function(e) {
		//window.location.href = "index.html";
		history.back();
	});
	
	$("#menu").click(function(e) {
		window.location.href = "index.html";
	});
});

function updateLines(data) {
	var linesWrapper = $(".lines_list");
	
	if (data["success"]) {
		linesWrapper.empty();
		
		var lines = data["lines"];
		for (var index in lines) {
			var lineLi = $("<li></li>", {class: "stop", "data-id": lines[index].id});
			var lineIcon = $("<span></span>", {class:"fontsmith_font onibus icone verde"});
			var nameSpan = $("<span></span>", {class: "name line_name"});
			var descriptionSpan = $("<span></span>", {class: "description"});
			var estimatedTimeSpan = $("<span></span>", {class: "estimated-time"});
			
			nameSpan.text(lines[index].name);
			descriptionSpan.text(" - " + lines[index].description);
			
			lineLi.append(lineIcon);
			lineLi.append(nameSpan);
			lineLi.append(descriptionSpan);
			lineLi.append(estimatedTimeSpan);
			
			linesWrapper.append(lineLi);
		}
	}
}