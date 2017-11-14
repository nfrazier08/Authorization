// Requiring our Todo model
var db = require('../models');

// Routes
// ==========
module.exports = function(app) {

//Home page route
app.get('/', function(req, res){    
      res.render("index");
})

//Adding new user to the database route!
app.post("/api/newUser", function(req, res){
    //Add code here for validation?? Seems logical!


    db.User.create({
        username: req.body.username, 
        email: req.body.email, 
        password: req.body.password, 
    })
    .then(function(user){
        res.json(user)
    })
})

//Successful push to database will reroute user to this page
app.get("/completeReg/:username", function(req, res){
    db.User.findOne({
        where: {
            username: req.params.username
        }
    }).then(function(user){
        var userObject ={
            handlebarCall: user
        };
        res.render("successPage", userObject)
        console.log(userObject);
    })
})











}