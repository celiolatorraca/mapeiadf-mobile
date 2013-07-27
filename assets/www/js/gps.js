MapeiaDF.GPS = function(params) {
	this.params = params;
	this.elementSelector = this.params.selector;
	
	this._init();
}

MapeiaDF.GPS.prototype = {
	
	markPosition: false,
	markPositionTimestamp: null,
	lastPosition: null,
	options: {enableHighAccuracy: true, maximumAge: 15000, timeout: 300000},
	
	_init: function() {
		this.verifyGPS();
		this._startWatchingPositions(this.elementSelector);
	},

	verifyGPS: function() {
		gpsDetect = cordova.require('cordova/plugin/gpsDetectionPlugin');
		gpsDetect.checkGPS(function(on) {
			if (!on) {
				alert("É preciso ligar seu GPS :)");
			}
		});
	},
	
	showResults: function() {
		MapeiaDF.Db.getInstance().transaction(function(tx) {
			tx.executeSql('SELECT * FROM MAPEIA_DF', [], function(tx, results) {
				alert("Returned rows = " + results.rows.length);
			    
			    var len = results.rows.length;
			    for (var i = 0; i < len; i++){
			        alert("Row = " + i + " ID = " + results.rows.item(i).id + " Latitude =  " + results.rows.item(i).latitude + " Longitude =  " + results.rows.item(i).longitude);
			    }
			});
		});
	},
	
	_startWatchingPositions: function(elementSelector) {
		var self = this;
		
		navigator.geolocation.watchPosition(function(position) {
			if (elementSelector != null) {
				var element = $(elementSelector);
				element.html('Latitude: '          	+ position.coords.latitude              + '<br />' +
			    		     'Longitude: '          + position.coords.longitude             + '<br />' +
			            	 'Altitude: '           + position.coords.altitude              + '<br />' +
			                 'Accuracy: '           + position.coords.accuracy              + '<br />' +
			                 'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
			                 'Heading: '            + position.coords.heading               + '<br />' +
			                 'Speed: '              + position.coords.speed                 + '<br />' +
			                 'Timestamp: '          + position.timestamp          		    + '<br />');
			}
			
			if (self.markPosition) {
				self.markPosition = false;
				
				if (self.lastPosition == null || (position.timestamp - self.markPositionTimestamp) < (self.markPositionTimestamp - self.lastPosition.timestamp)) {
					MapeiaDF.Db.savePosition(position.coords.latitude, position.coords.longitude);
				} else {
					MapeiaDF.Db.savePosition(self.lastPosition.coords.latitude, self.lastPosition.coords.longitude);
				}
			}
			
			self.lastPosition = position;
			
		}, self.onError, self.options);
	},
	
	_onError: function(error) {
	    alert("Error: "+error);
	}
}
