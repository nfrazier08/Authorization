// Requiring our model
var db = require('../models');
var bcrypt = require('bcrypt');
//Higher the salt rounds, the slower it is to hash the password
const saltRounds = 10;

//Authentication Packages
var session = require('express-session');
var passport = require('passport');


// Routes
// ==========
module.exports = function(app) {

//Homepage Route
app.get('/', function(req, res){
    res.render("home")
})

//Route for login page
app.get('/login', function(req, res){
    res.render("login")
})

app.get('/logout', function(req, res){
    //built in through passport and also destroys sessions
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

//Authenticate user when they attempt to login
//If they success in loggin in, they go to their profile page
//If they fail, they get sent back to the login page
//I added a parameter of username + password to the route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

app.get('/profile', authenticationMiddleware(), function(req, res){
    res.render("profile")
    //Just checking to see if the user is authenticated and logged in
    //These two functions are integrated within passport
    console.log(req.user)
    console.log(req.isAuthenticated())
})

// //Login page route
app.get('/register', function(req, res){    
      res.render("index");
})

app.post("/register", function (req, res){
    
    //Console.log to see if I am getting the correct NAME values
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);

    //Registration Requirements    
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 2-10 characters long.').len(2, 10);
    req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 2-10 characters long.').len(2, 10);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('passwordMatch', 'Password must be between 2-10 characters long.').len(2, 10);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);    
    
    var errors = req.validationErrors();

    //Error logic here:
    if(errors){
        console.log(`errors: ${JSON.stringify(errors)}`);
        res.render("index", {
            errors:errors
        })        
    }
    else {
        password = req.body.password;       
        //This adds the user to the database
        bcrypt.hash(password, saltRounds, function(err, hash){            
            db.User.create({
                username: req.body.username, 
                email: req.body.email, 
                password: hash                      
            }).then(function(user, error){
                //Need to get the newly created user id
                console.log("**Created user**")
                console.log(user.dataValues.id)

                if(error) throw error;
                    var userId = user.dataValues.id;                       
                    req.login(userId, function(error){
                        res.redirect('/profile')                    
                });                              
            });         
        })      
    }
});

passport.serializeUser(function(userId, done) {
    done(null, userId);
});
   
  passport.deserializeUser(function(userId, done) {    
      done(null, userId);
});

//Custom function snippet for passport that restricts a user from certain pages, unless they have logged in!
function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}








}