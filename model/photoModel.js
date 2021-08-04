const mongoose = require('mongoose');


const photoSchema = mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true }
    
    
},{versionKey:false})

const Photo = mongoose.model('Photo', photoSchema)
 
module.exports = Photo