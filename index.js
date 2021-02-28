var DBService = require('./db.js').db
var express = require('express')
var app = express()
var cors = require('cors');
var moment = require('moment');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

let db = new DBService()

//я съела/съел/выпил Т В 
//я начала принимать
//напомни мне сделать в 22-00
// 

function process(intent) {
	// return {
	// 	time: ,
	// 	event: ,
	// 	type: 
	// }
}

app.post('/intent', jsonParser, function (req, res) {
	var intent = req.body.intent
	// db.push("raw", {"ts": Date.now(), "raw": req.body.intent})
	console.log(req.body)
	res.json(intent)
})

app.get('/intents', function (req, res) {
	res.json([{"id":1, "ts": 12000000, "raw": "Я хочу кушать", "type":"basic"},
		{"id":2, "ts": 12500000, "raw": "Я покушала", "type":"basic"}])
})

app.use(express.static(__dirname + '/build'));
app.use(cors({origin: '*'}));

app.listen(8080, function () {
  	console.log('Reports app listening on port 8080');
});
