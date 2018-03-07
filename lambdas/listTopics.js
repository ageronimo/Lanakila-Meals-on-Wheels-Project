'use strict';

var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var sns = new AWS.SNS();

module.exports.listTopics = (event, context, callback) => {
	var params = {};
	sns.listTopics(params, function(err, data) {
		if (err){ 
			const response = {
				statusCode: 200,
				headers: {
			      "Access-Control-Allow-Origin":  "*",
			      "Access-Control-Allow-Credentials": true
			    },
				body: {
					message: (err, err.stack),
					input: event,
				},
			};
			callback(null, response);
		}
		else{
			const response = {
				statusCode: 200,
				headers: {
			      "Access-Control-Allow-Origin":  "*",
			      "Access-Control-Allow-Credentials": true
			    },
				body: {
					message: data.Topics,
					input: event,
				},
			};
			callback(null, response);
	    }
	})
 
};