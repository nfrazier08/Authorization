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
    db.User.create({
        username: req.body.username, 
        email: req.body.email, 
        password: req.body.password, 
        passwordMatch: req.body.passwordMatch
    })
    .then(function(user){
        res.json(user)
    })
})

//Successful Registration
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