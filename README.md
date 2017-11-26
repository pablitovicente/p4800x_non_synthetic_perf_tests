Requesites 

* MySql 14.14+
* Nodejs v8.9.1
* ap (Apache Bench)
* Redis (sudo add-apt-repository ppa:chris-lea/redis-server && sudo apt install redis-server)

Setup

* npm install 
* Make sure MySql, Redis are running!

Run Services

* pm2 delete SQL_STRESS_TEST_API && pm2 start sql_test_api.js --name SQL_STRESS_TEST_API -i max