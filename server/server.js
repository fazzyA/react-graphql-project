const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');

//below lines from graphqldesigner//
//require('dotenv').config();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const path = require('path');
const jwt = require("jsonwebtoken");
// var multer = require('multer');
const fileUpload = require('express-fileupload');

/////////////////////////////////////
 
const app = express();

//Connect Database
connectDB();
// allow cross-origin requests
app.use(cors());
app.use(fileUpload());


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
////////////////////////////////////////////////////
//console.log(`helllo idr name is ../${__dirname}`);

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  file.mv(`../client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
/////picture upload//
// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function(req, file, cb){
//      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
// }).single("picture");
// const router = express.Router();
// router.post("/upload", {
//   upload(req, res, (err) => {
//      console.log("Request ---", req.body);
//      console.log("Request file ---", req.file);//Here you get file.
//      /*Now do where ever you want to do*/
//      if(!err)
//         return res.send(200).end();
//   });
// };);
//////////////////////////////////////////////////////////////////////



/////line from gql designer//
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //Set to true to view GraphiQl in browser at /graphql
})); 
///////////////////////////////


app.use(express.static('../client/build'));
  
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

console.log(path.join(__dirname, '../client/build/index.html'))
// 

app.listen(port, ()=>console.log(`Server started on port ${port}`))