
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "root123",
    database: "taskdb",
  });


  con.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    } else {
      console.log('DB Connected Successfully');
    }
  });
  
  module.exports = con;