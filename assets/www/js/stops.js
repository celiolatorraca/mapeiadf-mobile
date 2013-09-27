$(function() {
	Mobee.Api.getStopsAround(updateStops);
	
	setInterval(function() {
		Mobee.Api.getStopsAround(updateStops);
	}, 5000);
});

function updateStops(data) {
	var stopsWrapper = $(".stops");
	
	if (data["success"]) {
		stopsWrapper.empty();
		
		var stops = data["stops"];
		for (var index in stops) {
			var stopDiv = $("<div></div>", {class: "stop", "data-id": stops[index].id});
			var nameSpan = $("<span></span>", {class: "name"});
			var distanceSpan = $("<span></span>", {class: "distance"});
			
			nameSpan.text(stops[index].name);
			distanceSpan.text("(" + +stops[index].distance + ")");
			
			stopDiv.append(nameSpan);
			stopDiv.append(distanceSpan);
			
			stopsWrapper.append(stopDiv);
		}
	}
}