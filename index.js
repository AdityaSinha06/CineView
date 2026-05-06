const express = require("express");
const mongoose = require("mongoose");
const Movie = require("./models/moviesModel.js");
const path = require("path");
const ejsMate = require('ejs-mate');

const app = express();
const port = 8080;

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/cineView");
}

main().then(() => {console.log("Connection to DB via mongoose success");})
    .catch(err => {console.log("Error: " , err.message);})

app.listen(port , (req , res) => {
    console.log("Server is listening at port: " , port);
});

app.get("/" , (req , res) => {
    res.send("Welcome to Server");
});

// Index-route
app.get('/movies', async (req, res) => {
    const moviesPerPage = 70;
    let page = parseInt(req.query.page) || 1;

    try {
        const totalMovies = await Movie.countDocuments();
        const totalPages = Math.ceil(totalMovies / moviesPerPage);

        // Safety: Ensure page is within valid range
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;

        const allMovies = await Movie.find({})
            .skip((moviesPerPage * page) - moviesPerPage)
            .limit(moviesPerPage);

        res.render('./listings/index.ejs', {
            allMovies,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (err) {
        res.status(500).send("Error loading movies");
    }
});

// show route : for a particular movie
app.get("/movies/:id" , async (req , res) => {
    let {id} = req.params;
    const movie = await Movie.findById(id);
    res.render("./listings/show.ejs" , {movie});
});