const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const directorModel = require('../models/Director');

router.post('/', (req, res, next) => {
    const director = new directorModel(req.body);
    const promise = director.save();

    promise.then((data) =>{
      res.json(data);

    }).catch((err) => {
         res.json(err);
    })
});


router.get('/:director_id',(req,res) =>{ 
  const promise = directorModel.aggregate(
    [
      {     //belli bir id ye sahip director için yazdık
            $match:{
              '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
      },
      {
            $lookup:{
                 from:'movies',
                 localField: '_id',
                 foreignField: 'director_id',
                 as: 'movies'
            }
      },
      {
            $unwind:{
                 path: '$movies',
                 preserveNullAndEmptyArrays: true
            }
      },
      {
            $group:{
                  _id:{
                    _id: '$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                  },
                  movies:{
                    $push:'$movies'
                  }
            }
      },
      {
            $project:{
              _id:'$_id._id',
              name:'$_id.name',
              surname:'$_id.surname',
              movies:'$movies'
            }
      }
    ]);
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
      res.json(err);
  })
});

router.put('/:director_id',(req,res,next) =>{ 
  const promise = directorModel.findByIdAndUpdate(req.params.director_id,req.body,{new:true});
  promise.then((director) =>{
    if (!director) {
      next({ message: 'The director was not found.',code:99});
  } else {
      res.json(director);
  }
  }).catch((err) =>{
      res.json(err);
  })
});


router.delete('/:movie_id',(req,res,next) =>{ 
  const promise = directorModel.findByIdAndRemove(req.params.directorModel);
  promise.then((director) =>{
    if (!director) {
      next({ message: 'The director was not found.',code:99});
  } else {
      res.json(director);
  }
  }).catch((err) =>{
      res.json(err);
  })
});

module.exports = router;
