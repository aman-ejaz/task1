For set up locally:-

1 - Install node js
2 - Install postgreSQL and pgAdmin4
3 - Make .env file like env.example file inside user microservice folder and fill values accordingly.
4 - Install nodemon (Optional)
5 - Run npm i
6 - Go to express app file i.e index.js and paste 'user.listen(3000)' at the end of the line.
7 - Go to pgAdmin and create database and fill env file with correct values.
8 - Select newly created database and open query tool.
9 - Go to sql-scripts and folder and copy sql code from user.sql and paste in query tool and execute the script.
10 - Run nodemon/node index.js