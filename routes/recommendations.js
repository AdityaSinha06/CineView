const express = require("express");
const router = express.Router({mergeParams: true});

router.post("/" , (req , res) => {
    let movieName = req.body.movies.name;
    movieName = movieName.trim();
    
    // let result = fetchRecommendations(movieName); // call the recommendation layer -> get results and then render back cards
});

router.get("/form" , (req , res) => {
    res.render("./listings/recommendationForm.ejs");
});

module.exports = router;
