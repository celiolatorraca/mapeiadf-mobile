$(function() {
	MapeiaDF.Api.getStopsAround(function(data) {
		var stopsWrapper = $(".stops");
		
		if (data["success"]) {
			var stops = data["stops"];
			for (var index in stops) {
				var stopDiv = $("<div></div>", {class: "stop", "data-id": stops[index].id});
				stopDiv.text(stops[index].name + " (" + +stops[index].distance + ")");
				
				stopsWrapper.append(stopDiv);
			}
		}
	});
});