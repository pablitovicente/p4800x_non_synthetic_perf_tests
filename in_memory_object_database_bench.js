const express = require('express');
const redisParser = require('redis-benchmark-parser');
const { exec } = require('child_process');

const app = express();


app.get('/bench/:numberOfObjects/:concurrency', (req, res) => {
  const numberOfObjects = req.params.numberOfObjects || 100000;
  const concurrency = req.params.concurrency || 5000;

  console.log(`Running Redis Benchmark`);

  exec(`redis-benchmark -c ${concurrency} -n ${numberOfObjects} -d 1024 -k 10000`, (error, stdout, stderr) => {
    const result = redisParser.parse(stdout);
    
    result.description = `This benchmark stored ${numberOfObjects} Objects (with a size of 1KByte each) simulating ${concurrency} concurrent clients reading and writting data to Redis (a very common key/value object store).
    It is not a synthetic benchmark but a real use case extremely common in the real world.
    `;
    res.send(result);
  });
});

app.listen(3002, () => console.log('Redis Test runner listening in port 3002!'));


 
