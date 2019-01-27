var express = require("express");
var router = express.Router();
var models = require("../app.js");
var middleware = require("../middleware")
var arraySort = require('array-sort');

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


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

async function getFinanceDetails(startDate, endDate){
	var query = 'SELECT COUNT(*) as totalPatients, Doctors.firstName, Doctors.lastName, SUM(totalFee) as total, SUM(doctorShare) as doctorShare, SUM(totalFee - doctorShare) as hospitalShare FROM Checkups INNER JOIN Doctors USING(doctorID) WHERE createDate BETWEEN "' + startDate + '" AND "' + endDate + '" GROUP BY Doctors.firstName, Doctors.lastName';
	var opd_details = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT})
	var lab_details = await sequelize.query('SELECT COUNT(*) as totalTests, SUM(Checkups.labFee) as labFee, SUM(Checkups.labShare) as labShare, SUM(Checkups.labFee-Checkups.labShare) as hospitalShare, Doctors.firstName, Doctors.lastName FROM Checkups INNER JOIN Doctors USING(doctorID) WHERE lab = 1 AND createDate BETWEEN "'+startDate + '" AND "' + endDate + '" GROUP BY Doctors.firstName, Doctors.lastName',{ type: sequelize.QueryTypes.SELECT});
	var pharmacy_details = await sequelize.query('SELECT SUM(totalSalePrice) as totalSales, SUM(totalCostPrice) as totalCost, SUM(totalProfit) as totalProfit FROM MedicineSales WHERE date BETWEEN "' + startDate + '" AND "' + endDate + '"',{ type: sequelize.QueryTypes.SELECT});
	var expenses_details = await sequelize.query('SELECT SUM(meal_tea) as meal_tea, SUM(gas) as gas, SUM(electricity) as electricity, SUM(salary) as salary, SUM(rent) as rent FROM Finances WHERE date BETWEEN "' + startDate + '" AND "' + endDate + '"',{ type: sequelize.QueryTypes.SELECT});
	return {
		opd_details: opd_details,
		lab_details: lab_details,
		pharmacy_details: pharmacy_details,
		expenses_details: expenses_details
	}
}

async function getFinances(startDate, endDate){
	// get OPD of that day
	var opd = await sequelize.query('SELECT SUM(totalFee - doctorShare) as total FROM Checkups WHERE createDate BETWEEN "' + startDate +'" AND "' + endDate + '"',{ type: sequelize.QueryTypes.SELECT});
	console.log("============ OPD ==============");
	// get Lab of that day
	var lab = await sequelize.query('SELECT SUM(labFee - labShare) as total FROM Checkups WHERE lab = 1 AND createDate BETWEEN "' + startDate +'" AND "' + endDate + '"',{ type: sequelize.QueryTypes.SELECT});
	console.log("============ LAB ==============");
	// get pharmacy profits
	var pharmacy = await sequelize.query('SELECT SUM(totalProfit) as total FROM MedicineSales WHERE date BETWEEN "' + startDate +'" AND "' + endDate + '"',{ type: sequelize.QueryTypes.SELECT});
	console.log("============ PHARMACY =============");
	// get expenses 
	var expenses = await sequelize.query('SELECT SUM(total) as total FROM Finances WHERE date BETWEEN "' + startDate +'" AND "' + endDate + '"',{ type: sequelize.QueryTypes.SELECT});
	console.log("============= EXPENSES ============");

	opd = opd.length > 0 ? opd[0].total:0;
	lab = lab.length > 0 ? lab[0].total:0;
	pharmacy = pharmacy.length > 0 ? pharmacy[0].total:0;
	expenses = expenses.length > 0 ? expenses[0].total:0;

	return {
		opd: opd,
		lab: lab,
		pharmacy: pharmacy,
		expenses: expenses
	};
}

router.get("/addFinances", middleware.isLoggedIn, middleware.isAdmin,function(req,res){
	res.render("Admin/addFinances");
})

router.get("/viewFinances", middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	res.render("Admin/viewFinances");
})

router.post("/addFinances", middleware.isLoggedIn, middleware.isAdmin, async function(req,res){
	

	var date = req.body.date;
	var week = req.body.week;
	var electricity = parseInt(req.body.electricity);
	var gas = parseInt(req.body.gas);
	var meal_tea = parseInt(req.body.meal_tea);
	var salary = parseInt(req.body.salary);
	var rent = parseInt(req.body.rent);

	console.log(req.body.meal_tea);
	console.log(meal_tea);

	console.log("========== FINANCE ROUTE ========");

	console.log(models.Finance);

	// var finances = await models.Finance.findAll({});


	// var existing = await models.Finance.findAll({
	// 	where: {
	// 		date: date,
	// 	}
	// });

	// if (existing.length > 0){
	// 	return res.send("-1");
	// }
	try{
		await models.Finance.create({
		date: date,
		electricity: electricity,
		gas: gas,
		meal_tea: meal_tea,
		salary: salary,
		rent: rent,
		total: electricity + gas + meal_tea + salary + rent
	});
	}
	catch(err){
		res.send("-3");
	}

	return res.send("1");

});

router.get("/addUser", middleware.isLoggedIn, middleware.isAdmin, async function(req,res){
	res.render("Admin/addUser");
})

router.post("/addUser", middleware.isLoggedIn, middleware.isAdmin, async function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	var userType = req.body.userType;

	await models.User.create({
		email: email,
		password: password,
		userType: userType
	});

	res.send("User successfully created.");
})

router.get("/finances", middleware.isLoggedIn, middleware.isAdmin, async function(req,res){
	var startDate = req.query.startDate;
	var endDate = req.query.endDate;


	var totals = await getFinances(startDate, endDate);
	var details = await getFinanceDetails(startDate, endDate);
	return res.json({
		totals: totals,
		details: details
	});

	
})

router.post("/medicines", middleware.isLoggedIn, middleware.isAdmin, async function (req, res) {
	
	console.log("============================");
	console.log("Running CREATE MEDICINE route");
	console.log("============================");
	var name = toTitleCase(req.body.name);
	var existing = await models.Medicine.findAll({
		where: {name: name}
	});

	if (existing.length > 0){
		return res.send("-1");
	};

	var data = {
		name: name,
		costPrice: req.body.costPrice,
		salePrice: req.body.salePrice,
		quantity: req.body.quantity
	}

	data.profit = parseInt(data.salePrice) - parseInt(data.costPrice);
	models.Medicine.create(data)
		.then(function (medicine) {
			return res.sendStatus(200);
		}).catch(()=>{return res.send("-2")});
});

router.get("/medicines/new", middleware.isLoggedIn, middleware.isAdmin, function (req, res) {
	res.render("Admin/medicineNew")
});

router.get("/medicines", middleware.isLoggedIn, middleware.isAdmin, async function(req,res){
	var medicines = await models.Medicine.findAll();
	res.json(medicines);
})

router.get("/medicines/manage", middleware.isLoggedIn, middleware.isAdmin, function(req,res){
	res.render("Admin/updateMedicines");
})

router.post("/updateMedicines", middleware.isLoggedIn, middleware.isAdmin, async function(req,res){
	var name = toTitleCase(req.body.name);

	var medicine = await models.Medicine.findOne({
		where: {name:name}
	});

	if(req.body.quantity.indexOf('+') === 0){
		medicine.quantity = parseInt(medicineQuantity) + parseInt(req.body.quantity);
	} else {
		medicine.quantity = req.body.quantity;
	}

	
	medicine.costPrice = req.body.costPrice;
	medicine.salePrice = req.body.salePrice;
	await medicine.save();
	return res.json(await models.Medicine.findAll());
})


module.exports = router;