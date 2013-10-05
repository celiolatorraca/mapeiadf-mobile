Mobee.RUNNING = 0;
Mobee.PAUSED = 1;

Mobee.API = function(params) {
	this.params = params;
	this.baseEndPoint = this.params.baseEndPoint;
	this.syncEndPoint = this.params.syncEndPoint;
	this.stopsAroundEndPoint = this.params.stopsAroundEndPoint;
	this.linesFromPointEndPoint = this.params.linesFromPointEndPoint;
	
	this._init();
}

Mobee.API.prototype = {
	
	status: Mobee.RUNNING,
	sendingResults: false,
	sendingResultIds: [],
	
	_init: function() {
		
	},
	
	sendResults: function(facebookUserId) {
		var self = this;
		
		if (!self.sendingResults) {
			self.sendingResults = true;
			
			Mobee.Db.getInstance().transaction(function(tx) {
				tx.executeSql('SELECT * FROM MOBEE', [], function(tx, results) {
					if (results.rows.length > 0) {
						var json = {};
						json["facebook_user_id"] = facebookUserId;
						json["linha"] = $("#linha").val();

						var stops = [];
						for (var i = 0; i < results.rows.length; i++) {
							self.sendingResultIds.push(results.rows.item(i).id);

							stops.push({
								lat: results.rows.item(i).latitude,
								lng: results.rows.item(i).longitude
							});
						}
						json["stops"] = stops;

						$.ajaxSetup({
							headers: {"X-Requested-With": "XMLHttpRequest"}
						});
						$.ajax({
							url: self.baseEndPoint + self.syncEndPoint,
							type: "POST",
							dataType: "json",
							contentType: "application/json",
							data: JSON.stringify(json),
							success: function(data) {
								Mobee.Db.deletePositions(self.sendingResultIds);
								
								alert("Pontos sincronizados com sucesso!");
							},
							error: function(jqXHR, errorType, exception) {
								console.log("Error! " + jqXHR.responseText);
								
								alert("Erro ao sincronizar pontos! Tente novamente mais tarde...");
							}
						});
					}
				});
			});
			
			self.sendingResultIds = [];
			self.sendingResults = false;
		}
	},
	
	getStopsAround: function(callback) {
		var self = this;
		if (!Mobee.Gps.lastPosition) {
			Mobee.Gps.getCurrentPosition(self._syncFromServer, callback);
		} else {
			self._syncFromServer(Mobee.Gps.lastPosition, callback);
		}
	},
	
	_syncFromServer: function(position, callback) {
		var self = Mobee.Api;
		var json = {};
		json["lat"] = position.coords.latitude+"";
		json["lng"] = position.coords.longitude+"";
		json["radius"] = 500;
		$.ajaxSetup({
			headers: {"X-Requested-With": "XMLHttpRequest"}
		});
		$.ajax({
			url: self.baseEndPoint + self.stopsAroundEndPoint,
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(json),
			success: function(data) {
				callback(data);
			},
			error: function(jqXHR, errorType, exception) {
				console.log("Error! " + jqXHR.responseText);
			}
		});
	},
	
	getLinesFromStop: function(stopId, callback) {
		var self = Mobee.Api;
		var json = {};
		json["stop_id"] = stopId;
		$.ajaxSetup({
			headers: {"X-Requested-With": "XMLHttpRequest"}
		});
		$.ajax({
			url: self.baseEndPoint + self.linesFromPointEndPoint,
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(json),
			success: function(data) {
				callback(data);
			},
			error: function(jqXHR, errorType, exception) {
				console.log("Error! " + jqXHR.responseText);
			}
		});
	}
	
}