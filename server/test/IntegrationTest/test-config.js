var mongoose = require('mongoose');
exports.DB = 'mongodb://localhost/test';

exports.connect = (callback) => {
	mongoose.connect(exports.DB,callback);
}

exports.close = (callback) => {
	mongoose.connection.close(callback);
}

exports.getConnection = () => {
	return mongoose.connection;
}

