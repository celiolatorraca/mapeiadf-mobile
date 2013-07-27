var db = null;
var last_id = null;

function getDatabase() {
	if (db == null) {
		db = window.openDatabase("mapeia-df", "1.0", "Mapeia DF - DB", 1000000);
		db.transaction(populateDB, errorCB);
	}
	return db;
}

function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS MAPEIA_DF');
    tx.executeSql('CREATE TABLE IF NOT EXISTS MAPEIA_DF (id unique, latitude, longitude)');
}

function errorCB(tx, err) {
    alert("Error processing SQL: "+err);
}

function savePosition(latitude, longitude) {
	getLastId();
	var intervalId = setInterval(function() {
		if (last_id != null) {
			clearInterval(intervalId);
			
			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO MAPEIA_DF (id, latitude, longitude) VALUES ('+ last_id +', '+ latitude +', '+ longitude +')');
				last_id++;
			}, errorCB);
		}
	}, 250);
}

function getLastId() {
	getDatabase().transaction(function(tx) {
		tx.executeSql('SELECT * FROM MAPEIA_DF ORDER BY id DESC', [], function(tx, results) {
			if (results.rows.length > 0) {
				last_id = results.rows.item(0).id + 1;
			} else {
				last_id = 1;
			}
		}, errorCB);
	}, errorCB);
}
