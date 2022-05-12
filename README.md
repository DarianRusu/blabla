# react-complete-e-commerce

## Live Demo

- [react-complete-e-commerce](https://react-complete-e-commerce.herokuapp.com/ "react-complete-e-commerce")

## Local ports

* static website: http://localhost:8014/
* eshop (react frontend): http://localhost:8010/
* eshop (api): http://localhost:8011/
* mongo (dockerized): http://localhost:8012/


## Instructions

1. Make sure you have these installed

   - [NodeJS](https://nodejs.org/en/download/ "NodeJS")
      - I used node version 14.15.3 and npm version 6.14.9 at time of creation
   - [MongoDB](https://www.mongodb.com/try/download/community "MongoDB")
      - I used mongo version 4.4.1 at time of creation
   - [Postman](https://www.postman.com/downloads/ "Postman")
      - I used postman version 7.36.1 at time of creation

2. Clone this repository into your local machine

 ```
 > git clone git@github.com:mazedesignhq/lwt-demos.git
 ```

3. backend setup (DO NOT cd to backend) (running on port you decide)

 ```
 > npm install
 ```
4. static website setup (running on port 8014)
```
> cd frontend
> npm install
```


5. frontend setup (running on port 8010)
   ```
   > cd frontend
   > npm install
   ```

6. Insert data into the MongoDB database
   - Start MongoDB server
      ```
      > mongod
      ```

   - Enter mongo shell
      ```
      > mongo
      ```

   - Insert data into the MongoDB database
      ```
      > npm run data:import
      ```

7. Rename .env-example to .env
   and set these values
   ```
   NODE_ENV = development
   PORT = 8011
   MONGO_URI = mongodb://localhost:8012
   JWT_SECRET = test-secret
   PAYPAL_CLIENT_ID = <>
   ```
8. Runs both frontend and backend (cd to ROOT of project)
   ```
   > npm run dev
   ```

9. Enjoy!

## Deploy for production

1. Make sure you have created accounts at

   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register "MongoDB Atlas")
   - [Heroku](https://signup.heroku.com/login "Heroku")

2. Then follow ALL step by step

   MongoDB:

   Logging into remote MongoDB server (may need to change the url,
   as well as in backend/src/server.js)

   ```
   > mongo "mongodb+srv://<cluster_name>.mongodb.net/<dbname>" --username <username>
   ```

   Inserting data into remote MongoDB database

   ```
   > npm run data:import
   ```

   Heroku:

   Installing Heroku using npm globally

   ```
   > npm install -g heroku
   ```

   Logging into Heroku

   ```
   > heroku login
   ```

   Creating a heroku app

   ```
   > heroku create
   ```

   Create .gitignore file
   Add this

   ONLY in entire file

   ```
   ## Dependency directories
   node_modules/
   ```

   OR

   ```
   Remove 'dist' and 'build' from .gitignore file
   ```

   ```
   > git init
   ```

   ```
   > heroku git:remote -a <app name>
   ```

   ```
   > git add .
   ```

   ```
   > git commit -am "initial commit"
   ```

   ```
   > git push heroku master
   ```
   ```

   OR

   ```   
   ```
   > git push --set-upstream heroku master
   ```
   ```

   OR

   ```   
   ```
   > git push heroku
   ```

   Setting environment variables

   ```
   > heroku config:set NODE_ENV=production -a <app name>
   ```

   ```
   > heroku config:set PORT=<> -a <app name>
   ```

   ```
   > heroku config:set MONGO_URI='<entire_uri+password>' -a <app name>
   ```

   ```
   > heroku config:set JWT_SECRET='<secret>' -a <app name>
   ```

   ```
   > heroku config:set PAYPAL_CLIENT_ID='<id>' -a <app name>
   ```

   ```
   > heroku ps:scale web=1
   ```

## More Stuff

Check out some other stuff on [Melvin K](https://github.com/iammelvink "Melvin K GitHub page").
