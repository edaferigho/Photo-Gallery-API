const express = require('express')
require('dotenv').config()
const dbConnect = require('./utility/db')
const PhotoRoute = require('./Route/photoRoute')

const app = express();
app.use(express.static('uploads'))
dbConnect()

app.use('/photos',PhotoRoute)

const PORT = process.env.PORT || 9000;


app.listen(PORT, () => {
    console.log(`Server is running at 127.0.0.1:${PORT}`);
})
