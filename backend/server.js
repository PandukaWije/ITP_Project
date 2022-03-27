let express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8090;


app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })

const connection = mongoose.connection;
connection.once("open", function(){
    console.log("Mongodb Connection successful!")
})


// bind the reservation file to the url
const reservationRouter = require("./routes/reservation.js")
//url calling route
app.use("/reservation", reservationRouter)




app.listen(PORT, function(){
    console.log(`server running on port: ${PORT}`)
})
