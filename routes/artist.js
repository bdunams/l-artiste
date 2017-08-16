const express = require('express');
const router = express.Router();

const db = require("../models");


/* GET All Artists */
router.get('/', function(req, res, next) {
  
  db.Artist.findAll({
    include:{
      model: db.Artwork
    }
  }).then((artists) =>{
    res.render('index', 
      { 
        title: "L'Artiste",
        artists: artists
      });
  })
  
});

/* GET an artist by name */
router.get('/:name', function(req, res, next) {
  
  db.Artist.findOne({
    where: {
      name: req.params.name
    },
    include:{
      model: db.Artwork
    }
  }).then((artist) =>{
    console.log(artist)
    
    db.Artwork.findAll({
      where: {
        id: artist.dataValues.id
      },
//      include:{
//        model: db.Rating
//      }
    }).then((artworks) => {
    
    res.render('artists', 
      {
        title: "L'Artiste",
      
        artist: artist,
                       
        artworks: artworks
      });
      
    });
  }) 
});

module.exports = router;
