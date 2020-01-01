const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');

//below lines from graphqldesigner//
//require('dotenv').config();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const path = require('path');
/////////////////////////////////////

const app = express();

//Connect Database
connectDB();
// allow cross-origin requests
app.use(cors());

const port = process.env.PORT || 4000;

/////line from gql designer//
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //Set to true to view GraphiQl in browser at /graphql
}));
///////////////////////////////

app.listen(port, ()=>console.log(`Server started on port ${port}`))