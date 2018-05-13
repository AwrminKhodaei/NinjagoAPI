const express= require('express');
const router = express.Router();
const Ninja = require('../modals/ninja');

// Get a list of ninja from database
router.get('/ninjas',function(req,res,next){
    
    /* Ninja.find({}).then(function(ninja){
        res.send(ninja)
    }); */
    Ninja.aggregate().near({
        near: {
         'type': 'Point',
         'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis"
       }).then(function(ninjas){
        res.send(ninjas);
    });
    
});

// Add new ninja to database
router.post('/ninjas',function(req,res,next){
    Ninja.create(req.body)
    .then(function(ninja){
        res.send(ninja);
    }).catch(next)
    
});

// Update a ninja in database
router.put('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Ninja.findOne({_id:req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });
});

// Delete a ninja from database
router.delete('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
        res.send(ninja);
    })
});







module.exports = router;