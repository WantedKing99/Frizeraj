const express = require('express')
const app = express()

var ejs = require('ejs');

const mysql = require('mysql')
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
    debugger
    res.render('terms', { REZULTAT : rows });    
  });
});

app.get('/', function (req, res) {
     res.render('main')
})

//ovde krece

// var mysql = require('mysql2');
// var ejs = require('ejs');
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'test', 
//   password: 'password',
//   database: 'frizeraj'
// });

// const express = require('express')
// const app = express()

// app.set('view engine', 'ejs')
// connection.connect();

// app.get('/', function (req, res) {
//      res.render('main')
// })

// app.get('/termini', (req, res) => {
//   connection.query('SELECT * FROM termin;', function (err, rows, fields) {
//     if (err) throw err;
//     res.render('terms', { termini : rows });    
//   });
// });

// connection.end()

app.listen(3000)