const express = require('express')
const app = express()

var ejs = require('ejs');
const mysql = require('mysql');
const multer = require('multer');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'modeli'
});

app.use(express.static("public"))

app.set('view engine', 'ejs')

app.get('/termini', (req, res) => {
  connection.query('SELECT * FROM termin;', function (err, rows, fields) {
    if (err) throw err;
    res.render('terms', { REZULTAT : rows });    
  });

});

app.get('/', function (req, res) {
     res.render('main')
})

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/test', multer().none(), (req,res)=>{
  // console.dir(req.body)
  connection.query('insert into termin (dan,cena, sat, opis, datum, imeKlijenta) values ("'+2 +'",'+req.body.cena+',"'+req.body.vreme+'","'+req.body.opis+'","'+req.body.datum+'","'+req.body.imeKlijenta+'")',
  // connection.query('insert into termin (cena,dan) values ('+ 1 +', "'+ 2 +'")',
  function (err, rows, fields) {
      if (err) throw err;
      console.log(req)
      res.send("Upisano u bazu");
  });
})

app.listen(3000)