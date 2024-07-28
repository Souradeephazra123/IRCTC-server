
1. at first clone fork the project and clone in git bash 
2.Then run  npm install to install all dependencies
3.then run ```node src/server.js``` to run in node else if you want to run in nodemon then run  ```npm run watch```

API:-

signup=>                            http://localhost:8000/signup<br/>   
login=>                             http://localhost:8000/login<br/>   
Add train =>                        http://localhost:8000/api/trains/create<br/>
availability of train=>             http://localhost:8000/api/trains/availability?source=Howrah&destination=Chennai<br/>
Book Train=>                        http://localhost:8000/api/trains/100005/book<br/>
Finding details of your bookings=>  http://localhost:8000/api/trains/bookings/6000001<br/>
