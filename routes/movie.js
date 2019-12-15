const express = require('express');
const router = express.Router();
//Models
const Movie = require('../models/Movie');
router.post('/', (req, res, next) => {
   // düzenleme yapmak istiyorsan bunu kullan
  //const {title,imbd_score,category,country,year} = req.body;
  /*
  const movie =  new Movie({
          title:title,
          imbd_score:imbd_score,
          category:category,
          country:country,
          year:year
  });*/
  const movie =  new Movie(req.body);
 /* movie.save((err,data) =>{
      if(err)
         res.json(err);
      else
         res.json({satatus:1});
  });
});*/
//daha temiz kullanım
const promise = movie.save();

promise.then((data) => {
  res.json({status:1});
}).catch((err) => {
     res.json(err);
})
});

  router.get('/',(req,res) =>{ 
      const promise = Movie.find({ });
      promise.then((data) =>{
        res.json(data);
      }).catch((err) =>{
          res.json(err);
      })
  });
  router.get('/:movie_id',(req,res,next) =>{ 
    const promise = Movie.findById(req.params.movie_id);
    promise.then((movie) =>{
      if (!movie) {
        next({ message: 'The movie was not found.',code:99});
    } else {
        res.json(movie);
    }
    }).catch((err) =>{
        res.json(err);
    })
});

//id den bul daha sonra req body den gelen değerlerle değiştir {new : true değiştirdiğini dönderir}
router.put('/:movie_id',(req,res,next) =>{ 
  const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});
  promise.then((movie) =>{
    if (!movie) {
      next({ message: 'The movie was not found.',code:99});
  } else {
      res.json(movie);
  }
  }).catch((err) =>{
      res.json(err);
  })
});

router.delete('/:movie_id',(req,res,next) =>{ 
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie) =>{
    if (!movie) {
      next({ message: 'The movie was not found.',code:99});
  } else {
      res.json(movie);
  }
  }).catch((err) =>{
      res.json(err);
  })
});

// imbd puanlarını büyükten küçüğe sırala ilk 10 tanesini getir
router.get('/top/10',(req,res) =>{ 
  const promise = Movie.find({ }).limit(10).sort({imbd_score:-1});
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
      res.json(err);
  })
});
//gte büyük yada eşit , lte küçük yada eşit
router.get('/between/:start_year/:end_year',(req,res) =>{ 
  const {start_year,end_year} = req.params;
  const promise = Movie.find({ 
      year: {"$gte":parseInt(start_year),"$lte": parseInt(end_year) }
  });
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
      res.json(err);
  })
});
module.exports = router;
