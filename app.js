// Standard initialization and imports
require('dotenv').config()
var express = require("express");
const cors = require('cors');
var app = express();

app.use(cors());

var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const fileUpload = require('express-fileupload');
app.use(fileUpload());
var expressSession = require("express-session")({
	secret: "This is my secret",
	resave: false,
	saveUninitialized: false
});
// authorization middleware
middleware = require("./middleware");
app.use(express.static(__dirname + "/public"));

function passUser(req, res, next) {
	res.locals.currentUser = req.user;
	next();
}

// Add headers



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var receptionistRoutes = require("./routes/receptionist.js");
var indexRoutes = require("./routes/index.js");
var patientRoutes = require("./routes/patients.js");
var doctorRoutes = require("./routes/doctors.js");
var counselorRoutes = require("./routes/counselor.js");
var pharmacistRoutes = require("./routes/pharmacist.js");
var userRoutes = require("./routes/users.js");
var adminRoutes = require("./routes/admin.js");


app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());


// Creating sequelize object and syncing with database
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME,  process.env.DB_USER,process.env.DB_PASS, {
	host: process.env.DB_LINK,
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: false
});
sequelize.dialect.supports.schemas = true;

var models = require('./models.js')(Sequelize, sequelize);

var User = models[0];
var Doctor = models[1];
var Patient = models[2];
var Receptionist = models[3];
var Pharmacist = models[4];
var Medicine = models [5];
var Finance = models[6];
var MedicineSale = models[7];
var Appointment = models[8];
var Checkup = models[9];
var PaidDue = models[10];

// For exporting data models to other files
module.exports.User = User;
module.exports.Doctor = Doctor;
module.exports.Patient = Patient;
module.exports.Receptionist = Receptionist;
module.exports.Pharmacist = Pharmacist;
module.exports.Medicine = Medicine;
module.exports.Finance = Finance;
module.exports.MedicineSale = MedicineSale;
module.exports.Appointment = Appointment;
module.exports.Checkup = Checkup;
module.exports.PaidDue = PaidDue

sequelize.sync();
console.log("synced");


require('./passport.js')(passport, User, Doctor, Patient, Pharmacist, Receptionist); // import auth strategies


passport.serializeUser(function (user, done) {

	done(null, user.userID);

});

passport.deserializeUser(function (id, done) {

	User.findById(id).then(function (user) {

		if (user) {
			done(null, user.get());
		} else {
			done(user.errors, null);
		}

	});

});

app.use(passUser);

app.use("/", indexRoutes);
app.use("/receptionist", receptionistRoutes);
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/counselors", counselorRoutes);
app.use("/pharmacists", pharmacistRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);




const PORT = process.env.PORT || 4000;

app.listen(PORT);