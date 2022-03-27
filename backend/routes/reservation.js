const router = require("express").Router()

//import reservation model 
let Reservation = require("../models/Reservation")

//=========================================================================================

//CRUD - Create Function

//insert data to location, BedroomCount , BathroomCount 
//create url - http://localhost:8090/reservation/add

router.route("/add").post(function(req, res){

    //to capture data from frontend
    const location = req.body.location
    const BedroomCount = req.body.BedroomCount
    const BathroomCount = req.body.BathroomCount

    const new_property = new Reservation({

        location,
        BedroomCount,
        BathroomCount

    })

    //call save method to pass the data to database
    //(.then)is a javascript promise - (if success -> pass this) else (err)

    new_property.save().then(function(){

        res.json("Property Added Successfully")

    }).catch(function(err){

        console.log(err)

    })

})

//=========================================================================================

//CRUD - Retrieve (ALL) Function

router.route("/").get(function(req, res){

    // call find method to view

    Reservation.find().then(function(property){

        res.json(property)

    }).catch(function(err){

        console.lot(err)

    })

})

//=========================================================================================

//CRUD - Update function

//:id to capture the mongodb document id (PK) ,it is the id that document has (" _id ") 
// put or post can be used to update
//async await function

router.route("/update/:id").put(async function(req, res){

    // to capture the id 
    let property_id = req.params.id

    // destructure method to catch data
    const {location, BedroomCount, BathroomCount} = req.body

    const update_property = {
        location,
        BedroomCount,
        BathroomCount
    }

    const update = await Reservation.findByIdAndUpdate(property_id, update_property).then(function(){

        res.status(200).send({status: "Property Updated"})

    }).catch(function(err){

        // error massage passed to backend
        console.log(err.massage)

        // to send error to frontend
        res.status(500).send({status: "Error with Updating data", error :err.massage})
    })
})


//=========================================================================================

// CRUD - Delete Function
// can use put or post

router.route("/delete/:id").delete(async function(req, res){
    let property_id = req.params.id

    await Reservation.findByIdAndDelete(property_id).then(function(){

        res.status(200).send({status: "Property Deleted"})

    }).catch(function(err){

        console.log(err.massage)

        res.status(500).send({status: "Error delete user", error:err.massage})
    })
})



//=========================================================================================

//CRUD - Retrieve (ONE) Function
router.route("/view/:id").get(async function(req, res){

    let property_id = req.params.id

    // use findOne to customize the id to like p_id 
   const data = await Reservation.findById(property_id).then(function(data){

        res.status(200).send({status: "Property fetched", data: data})

    }).catch(function(err){

        console.log(err.massage)

        res.status(500).send({status: "Error in Retrieving (one)", error:err.massage})
    })
})


//=========================================================================================

//export the router
module.exports = router
