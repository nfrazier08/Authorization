var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var methodOverride = require("method-override");
var cookieParser = require('cookie-parser')

var PORT = process.env.PORT || 3000;
var app = express();

// Requiring our models for syncing
var db = require("./models");

// //Authentication Packages
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var bcrypt = require('bcrypt');
//Higher the salt rounds, the slower it is to hash the password
const saltRounds = 10;


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(expressValidator()); //This line must be after any body parser included
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());

var options= {
    host     : 'localhost',
    user     : 'root',
    password : 'nicole90',
    database : 'auth'
  };

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'lsdjfklssjlfkshnkj',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    // cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));



//Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//REQUIRE ROUTES HERE:
require("./routes/logins.js")(app);

passport.use(new LocalStrategy(
    {
        username:'username',
        password:'password',
        passReqToCallback:true
    },
    function(req, username, password, done){
        db.User.findOne({
            where: {
                username:username
            }            
        }).then(function(user, err){
            console.log("***YOU GOT HERE***")
            // YOU NEED TO HASH THE LOGIN PASSWORD AGAIN 
            //FIGURE OUT TO GET THE SAVED HASHED PASS FROM THE DATABASE, 
                //CURRENTLY GETTING ONLY THE PLAIN TEXT PASSWORD
                    //THIS SIMPLY WILL NOT DO!
            console.log(user)
            console.log(username)
            console.log(password)
            if(err) {done(err)}
                if(!user){
                    done(null, false);
                }
            })
        })
            
   
)

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

// const hash = results
// bcrypt.compare(password, hash, function(err, response){

// })

// / })
// hash

//         bcrypt.compare(password, hash, function(err, response))
//         return done(null, 'gsd')
// })

