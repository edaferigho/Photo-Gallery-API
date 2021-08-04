const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        const fileName = `upload-${Date.now().toString()}${path.extname(file.originalname)}`
        cb(null,fileName)
    }
})
exports.uploads=multer({storage})