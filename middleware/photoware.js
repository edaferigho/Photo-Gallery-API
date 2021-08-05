

exports.checkInputId = (req, res, next) => {
    if (req.params.id.length !== 24) {
        res.status(400).json({
            message:'Invalid photo id'
        })
    }
    else next()
}