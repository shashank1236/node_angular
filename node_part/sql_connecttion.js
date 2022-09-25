const express = require("express");
const app = express();
const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'gyan',
  password : 'Gyan@0987',
  database : 'gyan'
});

app.get("/",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT * from testing', (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
        });
    }); 
});

app.get("/insert", (req, res)=> {
  pool.getConnection((err, connection) => {
    var sql = "INSERT INTO testing (name, email, phone) VALUES ('Siddarth', 'siddarth987@gmail.com', '5265453164')";
    connection.query(sql, function (err, result) {
      // if (err) throw err;
      console.log("1 record inserted");
    });
  })
})

app.listen(8081, () => {
  var dt = new Date();
    console.log('Server is running at port 8081 refreshed at :', 
        dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() );
}); 