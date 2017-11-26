Requesites 

* MySql 14.14+
* Nodejs v8.9.1
* ap (Apache Bench)
* Redis (sudo add-apt-repository ppa:chris-lea/redis-server && sudo apt install redis-server)

Setup

* npm install 
* Make sure MySql, Redis are running!

Run Services

* Firts Time: pm2 start sql_test_api.js --name SQL_STRESS_TEST_API -i max && pm2 start sql_test_runner.js --name SQL_BENCH_RUNNER && pm2 start in_memory_object_database_bench.js --name REDIS_BENCH_RUNNER
* If you are not familiar with pm2 and you just want to execute again just use (you need to first have executed the previous line): pm2 delete SQL_STRESS_TEST_API SQL_BENCH_RUNNER REDIS_BENCH_RUNNER && pm2 start sql_test_api.js --name SQL_STRESS_TEST_API -i max && pm2 start sql_test_runner.js --name SQL_BENCH_RUNNER && pm2 start in_memory_object_database_bench.js --name REDIS_BENCH_RUNNER
