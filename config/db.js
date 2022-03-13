require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

// create mySQL database
pool.execute(`
CREATE DATABASE IF NOT EXISTS cynerioDB;
`,
    (err, result) => {
        if (err) throw err;
        console.log(result);
    });


// create work_log table
pool.execute(`
CREATE TABLE IF NOT EXISTS cynerioDB.work_log (
  user_name varchar(100) NOT NULL,
  task_name varchar(100) NOT NULL,
  date_time datetime NOT NULL,
  PRIMARY KEY (user_name),
  UNIQUE KEY user_name_UNIQUE (user_name)
);
`,
    (err, result) => {
        if (err) throw err;
        console.log(result);
    });


// create tasks table
pool.execute(`
CREATE TABLE IF NOT EXISTS cynerioDB.tasks (
  id int NOT NULL AUTO_INCREMENT,
  user_name varchar(100) NOT NULL,
  task_name varchar(100) NOT NULL,
  start_time datetime NOT NULL,
  end_time datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id)
);
`,
    (err, result) => {
        if (err) throw err;
        console.log(result);
    });

module.exports = pool.promise();


