'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var fs = require('fs');
var url = require('url');

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

http.createServer(function (req, res) {
    var q = url.parse(req.url,true);
    var qdata = q.query;
    if (qdata.fname) {
        var formData = { fName: qdata.fname, lName: qdata.lname, email: qdata.email, phone:qdata.phone, message: qdata.message };
        MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
            if (err) {
                throw err;
            } else {
                console.log("successfully connected to the database");
                db.collection("contactdetails").insertOne(formData, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                });
                db.close();
            }
        });
    }
    fs.readFile('Page1.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.write(data);
        res.end();
    });
}).listen(port);
