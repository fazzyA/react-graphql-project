const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');

//below lines from graphqldesigner//
//require('dotenv').config();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const path = require('path');
const jwt = require("jsonwebtoken");
/////////////////////////////////////

const app = express();

//Connect Database
connectDB();
// allow cross-origin requests
app.use(cors());


const port = process.env.PORT || 4000;


// Set up JWT authentication middleware
app.use(async (req, res, next) => {
   console.log(req.headers)
  const authHeader =  req.headers["authorization"];
  if(!authHeader){
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];

   console.log("-----------------------------> Token : "+token)
  if (token !== "null" || token == undefined) {
    try {
      const currentUser = await jwt.verify(token, "process.env.SECRET");
      req.currentUser = currentUser;
      req.isAuth=true;
       console.log("current User -----------------|")
       console.log (currentUser)
    } catch (err) {
       console.error(err);
      req.isAuth = false;
    }
    
  }
  else {
    req.isAuth = false;
  }
  next();
});




/////line from gql designer//
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //Set to true to view GraphiQl in browser at /graphql
})); 
///////////////////////////////

app.listen(port, ()=>console.log(`Server started on port ${port}`))