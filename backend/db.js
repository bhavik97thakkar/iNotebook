const mongoose = require('mongoose'); //import mongoose
const mongoURI ="mongodb://localhost:27017/inotebook" // pasted link of the database

const connectToMongo=()=>{ //created function to connect to database
mongoose.connect(mongoURI,()=>{
    console.log("connected to mongoose successfuly");
})
}

module.exports = connectToMongo; // exporting the connect function through normal javascript style

// {
//     "name": "bhavik",
//     "email": "bhavik@gmail.com",
//     "password": "abcd"
//   }