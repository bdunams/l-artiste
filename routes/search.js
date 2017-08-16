const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/search', function(req, res, next) {
  
  if(req.body.searchType === 'artist'){
    
    res.redirect(`/artists/${req.body.name}`);
  }
  else if(req.body.seachType === 'artwork'){
    
    res.redirect(`/artwork/${req.body.id}`);
  }
  else if(req.body.seachType === 'category'){
    
  }
  
});

module.exports = router;
