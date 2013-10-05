$(function() {
	Mobee.Api.getStopsAround(updateStops);
	
	setInterval(function() {
		if(Mobee.Api.status == Mobee.RUNNING)
			Mobee.Api.getStopsAround(updateStops);
	}, 5000);

	$("#retornar").click(function(e) {
		window.location.href = "index.html";
	});
	$(".stop").click(function(e) {
		window.location.href = "stops_lines.html";
	});
});

function updateStops(data) {
	var stopsWrapper = $(".stops_list");
	
	if (data["success"]) {
		stopsWrapper.empty();
		
		var stops = data["stops"];
		for (var index in stops) {
			var stopLi = $("<li></li>", {class: "stop", "data-id": stops[index].id});
			var stopIcon = $("<span></span>", {class:"fontsmith_font onibus_ponto icone " + getIconColorByDistance(stops[index].distance)});
			var nameSpan = $("<span></span>", {class: "name"});
			var distanceSpan = $("<span></span>", {class: "distance"});
			
			nameSpan.text(stops[index].name);
			distanceSpan.text("(" + +stops[index].distance + ")");
			
			stopLi.append(stopIcon);
			stopLi.append(nameSpan);
			stopLi.append(distanceSpan);
			
			stopsWrapper.append(stopLi);
		}
	}
}

function getIconColorByDistance(distance){

	if(distance < 200)
		return 'verde';
	else if(distance < 350)
		return 'amarelo';
	else
		return 'vermelho';
}