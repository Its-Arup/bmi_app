const mongoose = require('mongoose');
require('dotenv').config()

const Connection = mongoose.connect(process.env.MONGO_LINK)

module.exports ={
    Connection
}

