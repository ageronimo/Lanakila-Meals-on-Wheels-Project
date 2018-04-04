'use strict';
const Pool = require('pg-pool');
const config = require('../config.json');
const {host, database, table, user, password, port, idleTimeoutMillis} = config
const Client = new Pool ({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis : 1000
});
module.exports.deleteMessage = (event, context, callback) => {
  let messageIDs = JSON.parse(event.body);
  let convertedArray = "(" + JSON.stringify(messageIDs).slice(1, -1) + ")";
  console.log(convertedArray);

  let deleteMsg = "DELETE FROM " + table[3] + " WHERE id IN " + convertedArray + ";"
  
  Client.connect() 
    .then(client => {
      client.release();
      return client.query(deleteMsg);
    })
    .then(res => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(res)
      }
      callback(null, response);
    })
    .catch(err => {
      console.log(err.stack);
      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(err.stack)
      }
      callback(null, response);
    })
};