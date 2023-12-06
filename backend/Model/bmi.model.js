const mongoose = require('mongoose')

const bmiSchema = mongoose.Schema({
    weight: Number,
    height: Number,
    time: String,
    bmi : Number,
    userID : String,
    username : String,
})

const BmiModel = mongoose.model("bmi",bmiSchema)

module.exports ={
    BmiModel
}

