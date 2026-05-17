const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require('passport');
const User = require("../models/usersModel.js");

// user route: 
router.get("/auth" , (req , res) => {
    res.render("./listings/userForm.ejs");
});

router.post("/login" , passport.authenticate("local" , {failureRedirect: "/user/auth" , failureFlash: true}), async (req , res) => {
    req.flash("success" , "welcome back to Cine-View, You are logged in!");
    res.redirect("/movies");
});

router.post("/signup" , async (req , res) => {
    try {
        let {username , email , password} = req.body.users;
        const newUser = new User({email , username});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);
        req.login(registeredUser , (er) => {
            if(er) return next(er);
            
            req.flash("success" , "Welcome to Cine-View");
            res.redirect("/movies");
        });
    } catch(err) {
        req.flash("error" , err.message);
        res.redirect("/user/auth");
    }
});

router.get("/logout" , (req , res , next) => {
    req.logout((err) => {
        if(err) return next(err);

        req.flash("success" , "You are logged out");
        res.redirect("/movies");
    });
})

module.exports = router;