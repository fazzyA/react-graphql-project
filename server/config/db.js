const mongoose = require('mongoose');
const config = require ('config');
const db = config.get('mongoURI');

const connectDB = async() =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        mongoose.connection.once('open',()=>{
            console.log("connection opened to MongoDB ")
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        // Exit proces with failure
        process.exit(1);

    }
}

module.exports = connectDB