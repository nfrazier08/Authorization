var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var methodOverride = require("method-override");

var PORT = process.env.PORT || 3000;
var app = express();

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(expressValidator()); //This line must be after any body parser included
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//REQUIRE ROUTES HERE:
require("./routes/logins.js")(app);


// app.get('/', function(req, res){    
//       res.render("index");
//   })

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});