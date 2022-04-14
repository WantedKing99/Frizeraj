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
  connection.query('select datum, sat, imeKlijenta from termin', function (err, rows, fields) {
    if (err) throw err;
    res.render('terms', { REZULTAT : rows });    
  });
});

app.get('/', function (req, res) {
     res.render('main')
})

var bodyParser = require('body-parser');
const req = require('express/lib/request');
app.use(bodyParser.json());

app.post('/test', multer().none(), (req,res)=>{
  // console.dir(req.body)
    // if(zaposleniOd < vreme || zaposleniDo > vreme)
      connection.query('insert into termin (dan,cena, sat, opis, datum, imeKlijenta) values ("'+req.body.dan +'",'+req.body.cena+',"'+req.body.vreme+'","'+req.body.opis+'","'+req.body.datum+'","'+req.body.imeKlijenta+'")',
      
  // connection.query('insert into termin (dan,cena, sat, opis, datum, imeKlijenta) values ("'+req.body.dan +'",'+req.body.cena+',"'+req.body.vreme+'","'+req.body.opis+'","'+req.body.datum+'","'+req.body.imeKlijenta+'")',
  function (err, rows, fields) {
      if (err) throw err;
      console.log(req)
      res.send("Upisano u bazu");
  });
})

connection.query('select * from zaposleni', function (err, rows, fields) {
    if (err) throw err;
    app.locals.zaposleni = rows;
    // console.log( app.locals.zaposleni);
});

connection.query('select * from termin',
function (err, rows, fields) {
    if (err) throw err;
    app.locals.termin = rows; 
    // console.log( app.locals.termin);   
});

connection.query('select * from radnovreme',
function (err, rows, fields) {
    if (err) throw err;
    app.locals.radnovreme = rows;   
});

app.post('/search', multer().none(), (req, res) => {
  if (req.body.cena == "")
      req.body.cena =0;    

  connection.query('select * from termin where cena >= ' + req.body.cena + 
  ' and  dan LIKE "' + req.body.dan + '" and imeKlijenta LIKE "' + req.body.imeKlijenta + '"',    
      function (err, rows, fields) {
          if (err) throw err;
          bez_rezultata = "";
          if( rows.length == 0)
          bez_rezultata = "Nema rezultata";
          
          res.render('terms', { REZULTAT: rows,  bez_rezultata :  bez_rezultata })
          // res.render('terms', { REZULTAT : rows });    

      });    
});

app.get('/sort/:crit/asc', multer().none(), (req, res) => {
  var crit = req.params.crit;        
  var order = req.params.order;      

  connection.query('select * from termin order by '+ crit +' asc ',
      function (err, rows, fields) {
          if (err) throw err;
          res.render('terms', { REZULTAT: rows })
      });     
});

app.get('/sort/:crit/desc', multer().none(), (req, res) => {
  var crit = req.params.crit;        
  var order = req.params.order;      

  connection.query('select * from termin order by '+ crit +' desc ',
      function (err, rows, fields) {
          if (err) throw err;
          res.render('terms', { REZULTAT: rows })
      });     
});

app.get('/delete/:idtermin', multer().none(),(req, res) => {
  var idtermin=req.params.idtermin
  connection.query('delete from termin where idtermin = '+ idtermin,
  function (err, rows, fields) {
    if (err) throw err;
    res.redirect("/termini")
    // res.render('terms', { REZULTAT: rows })
  }); 
});

app.listen(3000)