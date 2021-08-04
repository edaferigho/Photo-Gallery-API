const express = require('express')
require('dotenv').config()
const dbConnect = require('./utility/db')

const app = express();
dbConnect()

const PORT = process.env.PORT || 9000;


app.listen(PORT, () => {
    console.log(`Server is running at 127.0.0.1:${PORT}`);
})
