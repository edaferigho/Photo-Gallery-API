const Photo = require('../model/photoModel')
const utils = require('../utility/utils')
const path = require('path')
const fsExtra = require('fs-extra')

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
exports.deletePhoto = async(req, res) => {
    const id = req.params.id;
    try {
        const response = await Photo.findByIdAndRemove(id)
        if (response) {
            await fsExtra.unlink(path.resolve('uploads',response.image_url))
            res.status(200).json({
                status: 'Success!',
                message:'Photo deleted successfully!'
            })
        }
        else {
            res.status(404).json({
                status: 'Failed',
                message:`Photo ${id} not found`
            })
        }
    
    }
    catch (error) {
        res.status(500).send('Operation failed! Please again later!')
        console.log(error)
    }
}
exports.getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({});
        if (photos) {
            res.status(200).json({
                photos
            })
        }
        else {
            res.status(200).json({
                message:'No photo found in gallery!'
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message:'Currently unable to retrieve Photos, try again later!'
        })
    console.log(error)
        
    }
}
exports.getPhoto = async(req,res) => {
    const id = req.params.id;
    try {
        const photo = await Photo.findById(id)
        if (photo) {
            res.status(200).json({
                photo
            })
        }
        else {
            res.status(404).json({
                message:'Photo not found'
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message:'Unable to retrive Photo at this time, Please try later'
        })
    }
}
exports.searchByName = async(req, res)=> {
    const query = req.query;
    try {
        const photos = await Photo.find(query)
        if (photos) {
            res.status(200).send(photos)
        }
        else {
            res.status(404).json({
                message: `Photos not avaliable for the current query!`
            })
        }
    }
    catch (error) {
        res.status(500).send('Operation failed, Try again later')
        console.log(error)
    }
}