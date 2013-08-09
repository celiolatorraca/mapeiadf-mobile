MapeiaDF.Database = function(params) {
	this.params = params;
	this.dbName = this.params.dbName;
	this.dbVersion = this.params.dbVersion;
	this.dbDescription = this.params.dbDescription;
	this.dbSize = this.params.dbSize;
}

MapeiaDF.Database.prototype = {
	
	db: null,
	lastId: null,
	
	getInstance: function() {
		if (this.db == null) {
			this.db = window.openDatabase(this.dbName, this.dbVersion, this.dbDescription, this.dbSize);
			this.db.transaction(function(tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS MAPEIA_DF (id unique, latitude, longitude)');
			}, this._errorCB);
		}
		return this.db;
	},
	
	savePosition: function(latitude, longitude) {
		var self = this;
		
		self._getLastId();
		var intervalId = setInterval(function() {
			if (self.lastId != null) {
				clearInterval(intervalId);
				
				self.getInstance().transaction(function(tx) {
					tx.executeSql('INSERT INTO MAPEIA_DF (id, latitude, longitude) VALUES ('+ self.lastId +', '+ latitude +', '+ longitude +')');
					self.lastId++;
					
					MapeiaDF.Db.countPositions(".quantidade");
				}, self._errorCB);
			}
		}, 250);
	},
	
	deletePositions: function(ids) {
		var self = this;
		
		self.getInstance().transaction(function(tx) {
			var idsString = "";
			for (var i = 0; i < ids.length; i++) {
				idsString += ids[i] + ",";
			}
			idsString = idsString.substring(0, idsString.length-1);
			
			tx.executeSql('DELETE FROM MAPEIA_DF WHERE id in ('+ idsString +')');
			
			MapeiaDF.Db.countPositions(".quantidade");
		}, self._errorCB);
	},
	
	countPositions: function(selector) {
		var self = this;
		
		self.getInstance().transaction(function(tx) {
			tx.executeSql('SELECT count(*) as count FROM MAPEIA_DF', [], function(tx, results) {
				var count = 0;
				if (results.rows.length > 0) {
					count = results.rows.item(0).count;
				}
				$(selector).text(count);
				
			}, self._errorCB);
		}, self._errorCB);
	},
	
	_getLastId: function() {
		var self = this;
		
		self.getInstance().transaction(function(tx) {
			tx.executeSql('SELECT * FROM MAPEIA_DF ORDER BY id DESC', [], function(tx, results) {
				if (results.rows.length > 0) {
					self.lastId = results.rows.item(0).id + 1;
				} else {
					self.lastId = 1;
				}
			}, self._errorCB);
		}, self._errorCB);
	},

	_errorCB: function(tx, err) {
		alert("Error processing SQL: "+err);
	}
}
