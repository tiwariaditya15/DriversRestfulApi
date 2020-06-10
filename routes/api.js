const express = require('express');
const router = express.Router();
const DriverModel = require('../models/driver');

//get all drivers
router.get('/drivers', function(req, res, next){
    // DriverModel.find({}).then((drivers) => {
    //     res.send(drivers);
    // });

    DriverModel.aggregate().near(
        {
            near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
            maxDistance: 1000,
            spherical: true,
            distanceField: 'dist'
        }
    ).then(drivers => {
        res.send(drivers);
    });
});

//put a new driver
router.post('/drivers', function(req, res, next){
    DriverModel.create(req.body).then( callbackParam => {
        res.send({callbackParam,
            isPosted: true
        });
    }).catch(next);
    
    // i could do this or write middleware function in index to send response
    // but it's better to have common middleware handlers for scalibility purpose
    // .catch( error => {
    //     res.status(422).send({error});
    // });
});

//update a driver
router.put('/drivers/:id', function(req, res, next){
    DriverModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then( ninja => {
        res.send(ninja);
    });
    // res.send({type: 'PUT'});
});

//delete a driver
router.delete('/drivers/:id', function(req, res, next){
    console.log(req.params.id);
    DriverModel.findByIdAndRemove({_id: req.params.id}).then( ninja => {
                res.send(ninja);
    });
    // res.send({type: 'DELETE'});
});

module.exports = router;