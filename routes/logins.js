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
                                //Error message to be returned!
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 2-10 characters long.').len(2,10);
    req.checkBody('email', 'The email you entered is invalid.').isEmail();
    req.checkBody('email', 'Email must be between 4-100 characters long').len(4,100);
    req.checkBody('password', 'Password must be between 2-10 characters long.').len(2,10);
    req.checkBody('password', 'Password must include one lowercase character, one uppercase letter, a number and a special character').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('passwordMatch', 'Password must be between 2-10 characters long.').len(2-10);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

    var errors = req.validationErrors();
    if(errors){
        var errorObject = {
           errors:errors
        }
        console.log(`errors: ${JSON.stringify(errors)}`);        
        res.render("index", errorObject);
        console.log("***error object***")
        console.log(errorObject);
    }

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