const mongoose = require('mongoose');


const photoSchema = mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true }
    
}, { versionKey: false })
//This stops (DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify)
mongoose.set('useFindAndModify',false)
const Photo = mongoose.model('Photo', photoSchema)
 
module.exports = Photo