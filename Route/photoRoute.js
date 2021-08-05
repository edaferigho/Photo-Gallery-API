const utils = require('../utility/utils')
const photoController = require('../controller/photoController')
const express = require('express')
const photoware = require('../middleware/photoware')
const Router = express.Router()

Router.use(express.json());
Router.use(express.urlencoded({ extended: true }))
Router.use(express.static('uploads'))

const uploads = utils.uploads
const checkId = photoware.checkInputId;

Router.post('/', uploads.single('image'), photoController.addPhoto)
Router.put('/:id',checkId, photoController.updatePhoto)
Router.delete('/:id',checkId, photoController.deletePhoto)
Router.get('/', photoController.getPhotos)
Router.get('/:id',checkId,photoController.getPhoto)

module.exports = Router;