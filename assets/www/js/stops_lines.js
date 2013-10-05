$(function() {
	
	$("#retornar").click(function(e) {
		//window.location.href = "index.html";
		history.back();
	});
	
	$("#menu").click(function(e) {
		window.location.href = "index.html";
	});
});

function updateLines(data) {
	var stopsWrapper = $(".stops_list");
	
	if (data["success"]) {
		stopsWrapper.empty();
		
		var stops = data["stops"];
		for (var index in stops) {
			var stopLi = $("<li></li>", {class: "stop", "data-id": stops[index].id});
			var stopIcon = $("<span></span>", {class:"fontsmith_font onibus_ponto icone verde"});
			var nameSpan = $("<span></span>", {class: "name line_name"});
			var descriptionSpan = $("<span></span>", {class: "description"});
			var estimatedTimeSpan = $("<span></span>", {class: "estimated-time"});
			
			nameSpan.text(stops[index].name);
			distanceSpan.text("(" + +stops[index].distance + ")");
			
			stopLi.append(stopLi);
			stopLi.append(stopIcon);
			stopLi.append(nameSpan);
			stopLi.append(descriptionSpan);
			stopLi.append(estimatedTimeSpan);
			
			stopsWrapper.append(stopLi);
		}
	}
}