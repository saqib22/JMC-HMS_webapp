var express = require("express");
var router = express.Router();
var models = require("../app.js");
var middleware = require("../middleware");
var passport = require("passport");

var User = models.User;
var Patient = models.Patient;
var Medicine = models.Medicine;
var Counselor = models.Counselor;
var Appointment = models.Appointment;
var Prescription = models.Prescription;
var Receptionist = models.Receptionist;
var Doctor = models.Doctor;


router.get("/", function (req, res) {
    res.render("login");
});

router.get("/register", function (req, res) {
    res.render("register");
});

router.get("/successfulRegister", function (req, res) {
    res.send("Success!");
});


router.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/successfulRegister',

        failureRedirect: '/failedRegister'
    }

));

router.get("/loginRetry", function(req,res){
    res.render("loginRetry");
})

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',

    failureRedirect: '/loginRetry'
}));

router.get("/dashboard", middleware.isLoggedIn, function (req, res) {

        
    
        if (req.user.userType === "Receptionist") {
            res.redirect("/receptionist/users/new")
        }
        else if(req.user.userType === "Pharmacist"){
            res.redirect("/pharmacists/dispatch");
        }
    

        else if (req.user.userType === "Admin"){
            res.redirect("/admin/viewFinances");
        }
    
    });
    
    
    router.get("/login", function (req, res) {
        res.render("login");
    });

    router.get("/logout", function(req,res){
        req.session.destroy(function(err) {
            
        res.redirect('/');
    })
});

module.exports = router;