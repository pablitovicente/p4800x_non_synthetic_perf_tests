const express = require('express');
const abResult = require('ab-result');
const { exec } = require('child_process');

const app = express();


app.get('/bench/:numberOfRequests/:concurrency/:mode', (req, res) => {
  const numberOfRequests = req.params.numberOfRequests || 500;
  const concurrency = req.params.concurrency || 100;
  const mode = req.params.mode || 'massive';

  console.log(`Running benchmark with config: numberOfRequests: ${numberOfRequests}, concurrency: ${concurrency}`);

  exec(`ab -n ${numberOfRequests} -c ${concurrency} http://localhost:3000/${mode}`, (error, stdout, stderr) => {
    const result = abResult(stdout);
    result.test.totalTransferred = Math.floor(result.test.totalTransferred / 1024 / 1024) + ' MB';
    result.test.htmlTransferred = Math.floor(result.test.htmlTransferred / 1024 / 1024) + ' MB';
    result.description = `This benchmark executed ${numberOfRequests} requests with a parallelism of ${concurrency} requests to a real API written in NodeJS.
    It is not a synthetic benchmark but a real use case extremely common in the real world. 
    The sample response from this API endpoint returns a JSON Object with a size of 1.1 Mega Bytes. 
    MySql was used and the API executes a not optimized JOIN operation between two tables with a cardinality of 853.282.357.128 records.
    `;
    res.send(result);
  });
});

app.listen(3001, () => console.log('Test runner listening in port 3001!'));


 
