const Photo = require('../model/photoModel')
const utils = require('../utility/utils')
const path = require('path')

const uploads = utils.uploads;

exports.addPhoto = async(req,res) => {
    //1. get photo details from body
    const photo = { name, description }= req.body
    if (!photo.name||!photo.description) {
        res.status(400).json({
            status: 'failed',
            message:'Image name or description missing'
        })
    }
    else if (!req.file) {
        res.status(400).json({
            status: 'failed',
            message:'Please add image'
        })
    }
    else {
        //2. Add image url from file upload
        const imagePath = req.file.path
        photo.image_url = path.basename(imagePath);
        //3. Add photo object to database
        try {
            const createdPhoto = await Photo.create({ ...photo })
            res.status(201).json({
                status: 'Successful',
                response:createdPhoto
            })
        } catch (error) {
            console.error(error)
        }
    }
    
    

}
exports.updatePhoto = async(req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!update) {
        res.status(400).json({
            status: 'failed!',
            message:'add update details'
        })
    }
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(id,{...update});
        res.status(200).json({
            status: 'Successful',
            photo:updatedPhoto
            // message:`Photo ${updatedPhoto._id} updated successfully!`
        })
    }
    catch (error) {
        console.error(error)
    }
    
}