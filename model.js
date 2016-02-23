var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'users',
   idAttribute: 'userId'
});

var Vehicle = DB.Model.extend({
	tableName: 'vehicles',
	idAttribute: 'vehicleId'
});

module.exports = {
   User: User,
   Vehicle: Vehicle
};