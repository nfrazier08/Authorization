// Requiring our model
var db = require('../models');
var bcrypt = require('bcrypt');
//Higher the salt rounds, the slower it is to hash the password
const saltRounds = 10;


// Routes
// ==========
module.exports = function(app) {

//Homepage Route
app.get('/', function(req, res){
    res.render("home")
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
            }).then(function(user){
                var id = req.params.id;
                db.User.findAll({                    
                    limit:1,
                    where: {
                        id:req.params.id
                    },
                    order:[['id', 'DESC']]                     
                }).then(function(user, results){                    
                    req.login(results, cb)
                    console.log(results)
                    res.render("successPage");
                })                 
            })          
        })      
    }
})













}