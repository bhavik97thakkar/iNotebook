const mongoose = require('mongoose'); //import mongoose
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{ //its like foreign key
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },

  });

  module.exports = mongoose.model('notes', NotesSchema)