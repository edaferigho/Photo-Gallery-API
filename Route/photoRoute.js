const utils = require('../utility/utils')
const photoController = require('../controller/photoController')
const express = require('express')
const Router = express.Router()

Router.use(express.json());
Router.use(express.urlencoded({ extended: true }))
Router.use(express.static('uploads'))

const uploads = utils.uploads

Router.post('/', uploads.single('image'), photoController.addPhoto)
Router.put('/:id', photoController.updatePhoto)
Router.delete('/:id',photoController.deletePhoto)

module.exports = Router;