//database model
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ReservationSchema = new Schema({

    // items inside the document
    location: {
        type : String,
        required: true
    },

    BedroomCount: {
        type: String,
        required: true

    },

    BathroomCount: {
        type: String,
        required: true

    }

})

//Creating Property_Info document in mongodb (Property_Info >>> property_info)
const Reservation = mongoose.model("Property_Info", ReservationSchema);

//export to routes
module.exports = Reservation;