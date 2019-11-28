const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');


const app = express();
//Connect Database
connectDB();
// allow cross-origin requests
app.use(cors());

const port = process.env.PORT || 4000;

app.listen(port, ()=>console.log(`Server started on port ${port}`))