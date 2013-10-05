Mobee.GPS = function(params) {
	this.params = params;
	this.options = this.params.options;
	
	this._init();
}

Mobee.GPS.prototype = {
	
	markPosition: false,
	markPositionTimestamp: null,
	lastPosition: null,
	
	_init: function() {
		this.verifyGPS();
		this._startWatchingPositions();
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
		Mobee.Db.getInstance().transaction(function(tx) {
			tx.executeSql('SELECT * FROM MOBEE', [], function(tx, results) {
				alert("Returned rows = " + results.rows.length);
			    
			    var len = results.rows.length;
			    for (var i = 0; i < len; i++) {
			        alert("Row = " + i + " ID = " + results.rows.item(i).id + " Latitude =  " + results.rows.item(i).latitude + " Longitude =  " + results.rows.item(i).longitude);
			    }
			});
		});
	},
	
	getCurrentPosition: function(syncFromServer, callback) {
		navigator.geolocation.getCurrentPosition(function(position) {
			syncFromServer(position, callback);
		}, this.onError, this.options); 
	},
	
	_startWatchingPositions: function() {
		var self = this;
		
		navigator.geolocation.watchPosition(function(position) {
			if (self.markPosition) {
				self.markPosition = false;
				
				if (self.lastPosition == null || (position.timestamp - self.markPositionTimestamp) < (self.markPositionTimestamp - self.lastPosition.timestamp)) {
					Mobee.Db.savePosition(position.coords.latitude, position.coords.longitude);
				} else {
					Mobee.Db.savePosition(self.lastPosition.coords.latitude, self.lastPosition.coords.longitude);
				}
			}
			
			self.lastPosition = position;
			
		}, self.onError, self.options);
	},
	
	_onError: function(error) {
	    console.log("Error: "+error);
	}
}
