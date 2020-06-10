const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// making geo schema
const GeoSchema = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});


// making driver schema
const DriverSchema = new  Schema({
    name: {
        type: String,
        required: [true, 'Name is required field.']
    },
    isHirelable:{
        type: Boolean,
        default: false
    },
    age: Number,
    firm: String,
    carType: String,
    carName: String,
    geometry: GeoSchema
});


const DriverModel = mongoose.model('driver', DriverSchema);

module.exports = DriverModel;