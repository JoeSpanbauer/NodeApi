Description:
This is a starting point for creating a Node Api.

Setup:
1) You will need to run "node scripts/generateEnv" in a console from the root of the project.
2) Then, you will have to get a MySQL or PostgreSQL database and fill out the values in the .env file.
**If you choose to use PostgreSQL, you will have to update a few things.
  - The api/common/connection.js file.
    - Comment out the blocks under the MySQL comments and comment in the blocks under the Postgres comments, there are 3 of them.
  - You will have to run "npm i pg"
  - You will want to remove the mysql8 package and references if you will not use that in the future.
  
3) After you've configured the project, run "npm i", then "npm start" and you should be up and running.
4) Using software like Postman, you can then access endpoints like "http://localhost:3000/member" via GET, POST, PUT, DELETE.
