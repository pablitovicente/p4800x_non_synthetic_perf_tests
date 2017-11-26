const mysql = require('mysql');
const express = require('express');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'employees'
});

connection.connect();
const app = express();

// Employee ids begin at 10001 and end in 499999, using a mechanical disk was not possible to get many results so this variable is used for tunning how insane this tests is....
const biggestEmployeeNumber = 10501;
let requestsServerd = 0;

app.get('/insane', (req, res) => {
  connection.query(`SELECT * FROM
    employees.employees e
      INNER JOIN
    employees.salaries s ON (e.emp_no = s.emp_no) WHERE e.emp_no <= ${biggestEmployeeNumber} ORDER BY RAND()`, function (error, results, fields) {
    if (error) throw error;
    console.log(`sending ${results.length} results to http client...`);
    // No time to do stats in Redis...
    // requestsServerd++;
    res.send(results);
  });
});

app.get('/massive', (req, res) => {
  connection.query(`SELECT * FROM
    employees.employees e
      INNER JOIN
    employees.salaries s ON (e.emp_no = s.emp_no) WHERE e.emp_no <= ${biggestEmployeeNumber}`, function (error, results, fields) {
    if (error) throw error;
    console.log(`sending ${results.length} results to http client...`);
    // No time to do stats in Redis...
    // requestsServerd++;
    res.send(results);
  });
});


app.get('/sample_response_body', (req, res) => {
  connection.query(`SELECT * FROM
    employees.employees e
      INNER JOIN
    employees.salaries s ON (e.emp_no = s.emp_no) LIMIT 1`, function (error, results, fields) {
    if (error) throw error;
    console.log(`sending ${results.length} results to http client...`);
    // No time to do stats in Redis...
    // requestsServerd++;
    res.send(results);
  });
});

app.get('/serverstats', (req, res) => {
  const used = process.memoryUsage();
  const stats = {};
  for (let key in used) {
    stats[key] = `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`;
  }
  // No time to do stats in Redis...
  // stats.requestsServerd = requestsServerd;
  res.send(stats);
});


app.listen(3000, () => console.log('Stress Test API listening on port 3000!'));