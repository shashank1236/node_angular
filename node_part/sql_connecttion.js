const express = require("express");
const app = express();
const path = require('path')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'gyan',
  password : 'Gyan@0987',
  database : 'test'
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.set('view engine', 'ejs');
app.set('views','./frontend');

app.get("/",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT * from student', (err, rows) => {
            connection.release();
            if(err) throw err;
            res.render('first_view', {data: rows});
        });
    }); 
});

app.get('/edit/:id', function(req, res){
   pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT * from student WHERE id = ' + req.params.id, (err, rows) => {
            connection.release();
            if(err) throw err;
            res.render('edit', {data: rows[0]});
        });
    }); 
});

app.post('/update/:id', function(req, res){
   pool.getConnection((err, connection) => {
        if(err) throw err;
        // console.log('connected as id ' + connection.threadId);
        connection.query(`UPDATE student set name='${req.body.name}', email='${req.body.mail}', phone='${req.body.phone}' WHERE id = ` + req.params.id, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            res.redirect('/edit/' + req.params.id);
        });
    }); 
});

app.get('/delete/:id', function(req, res){
   pool.getConnection((err, connection) => {
        if(err) throw err;
        // console.log('connected as id ' + connection.threadId);
        connection.query(`DELETE FROM student WHERE id = ` + req.params.id, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            res.redirect('/');
        });
    }); 
});

app.post("/add", (req, res)=> {
  pool.getConnection((err, connection) => {
    var sql = `INSERT INTO student (name, email, phone) VALUES ('${req.body.name}', '${req.body.mail}', '${req.body.phone}')`;
    connection.query(sql, function (err, result) {
      // if (err) throw err;
      console.log("1 record inserted");
      res.redirect('/');
      // next();
    });
  })
})

app.listen(8081, () => {
  var dt = new Date();
    console.log('Server is running at port 8081 refreshed at :', 
        dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() );
});