
# Basic version of a web based wallet app like PayTM

## Introduction 

A basic version of web based wallet to send money to others users in the app. This repository contains both the backend and the frontend in separate modules such that it follows separation of concerns(SoC). 

The stack used to build this app includes JavaScript, React, Tailwind CSS and Vite as the build tool for fast modern development in frontend and NodeJS, Express, Zod for the input validation, Jwt for authentication and MongoDB along with Mongoose as the database and ODM respectively for the backend.  

### Why this app? What purpose does this serve? 

As of now, this is very barebone & modest looking web-app incorporating some of the features that an app like PayTM or Google Pay provides. That said, this was my learning checkpoint to implement all my things that I have learned so far. I plan to add more features in future.

### How to run >

Clone the repository locally :
```bash
git clone git@github.com:EnTRoPY0120/SimplePay.git
```
Change to the directory backend and run :
```bash 
cd backend/
npm install                 // To bring the dependencies locally 
node index.js               // Make sure you have NodeJS installed locally
``` 
Use your own DB connection string in file backend/db.js :
```js
const { default: mongoose,  } = require("mongoose");

mongoose.connect("${Your_Own_URL}");
```

Or if you docker installed go to the root folder and run the following commands :
```bash
docker build -t mongodb .

docker run -d -p 27017:27017 --name mongodb-container mongodb --replSet rs
```

Now use the localhost DB connection string : 
```js
const { default: mongoose,  } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/SimpleDB");
```


Change to the directory frontend and run :

```bash 
npm install 
npm run dev 
``` 

Open the link the vite provides you and navigate to the signup page
```
 http://localhost:5173/signup
```