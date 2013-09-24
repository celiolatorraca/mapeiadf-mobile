MapeiaDF.API = function(params) {
	this.params = params;
	this.baseEndPoint = this.params.baseEndPoint;
	this.syncEndPoint = this.params.syncEndPoint;
	this.stopsAroundEndPoint = this.params.stopsAroundEndPoint;
	
	this._init();
}

MapeiaDF.API.prototype = {
	
	sendingResults: false,
	sendingResultIds: [],
	
	_init: function() {
		
	},
	
	sendResults: function(facebookUserId) {
		var self = this;
		
		if (!self.sendingResults) {
			self.sendingResults = true;
			
			MapeiaDF.Db.getInstance().transaction(function(tx) {
				tx.executeSql('SELECT * FROM MAPEIA_DF', [], function(tx, results) {
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
								MapeiaDF.Db.deletePositions(self.sendingResultIds);
								
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
		
		if (!MapeiaDF.Gps.lastPosition) {
			MapeiaDF.Gps.getCurrentPosition(self._syncFromServer, callback);
		} else {
			self._syncFromServer(MapeiaDF.Gps.lastPosition, callback);
		}
	},
	
	_syncFromServer: function(position, callback) {
		var self = MapeiaDF.Api;
		
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
				
				alert("Erro ao buscar as paradas mais próximas! Tente novamente mais tarde...");
			}
		});
	}
	
}