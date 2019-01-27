var express = require("express");
var router = express.Router();
var models = require("../app.js");
var middleware = require("../middleware");

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


router.get("/prescriptions", middleware.isLoggedIn, middleware.isPharmacist, function (req, res) {
	models.Prescription.findAll({
			where: {
				served: false
			}, include: [{
				model: models.Medicine,
			}]
		})
		.then(function (prescriptions) {
			res.render("Pharmacist/prescriptions", {
				user: req.user,
				prescriptions: prescriptions
			});
		})
});

router.patch("/prescriptions/:id", middleware.isLoggedIn, middleware.isPharmacist, function (req, res) {

	models.Prescription.findOne({
			where: {
				prescriptionID: req.params.id
			}
		})
		.then(function (prescription) {
			models.Medicine.findOne({
					where: {
						medicineID: prescription.dataValues.medicineID
					}
				})
				.then(function (medicine) {
					if (medicine.dataValues.quantity >= prescription.dataValues.quantity) {
						models.Prescription.update({
								served: true
							}, {
								where: {
									prescriptionID: prescription.dataValues.prescriptionID
								}
							})
							.then(function (status) {
								console.log("Prescription updated.")
								models.Medicine.update({
										quantity: medicine.quantity - prescription.quantity
									}, {
										where: {
											medicineID: medicine.dataValues.medicineID
										}
									})
									.then(function (stat) {
										console.log("Medicine Updated");
										res.redirect("/pharmacists/prescriptions")
									})
							})

					} else {
						res.send("Not enough medicines in stock.");
					}
				})
		});
});


router.get("/medicines", middleware.isLoggedIn, middleware.isPharmacist, function (req, res) {
	models.Medicine.findAll({
			where: {}
		})
		.then(function (medicines) {
			res.render("Pharmacist/viewMedicines")
		})
});

router.get("/dispatch", middleware.isLoggedIn, middleware.isPharmacist, function (req, res) {
	models.Medicine.findAll({
			where: {}
		})
		.then(function (medicines) {
			res.render("Pharmacist/saleForm")
		})
});

router.post("/dispatch", middleware.isLoggedIn, middleware.isPharmacist, async function(req,res){
	var medicineID = req.body.medicineID;
	var quantity = req.body.quantity;

	var medicine = await models.Medicine.findOne({
		where: {medicineID: req.body.medicineID}
	});

	if (medicine.quantity < quantity){
		return res.send("-1");
	}

	medicine.quantity -= quantity;
	await medicine.save();

	var datetime = new Date().toISOString();
	var date = datetime.slice(0,(datetime.indexOf('T')));

	// Create medicine sale entry
	var saleData = {
		medicineID: medicine.medicineID,
		quantity: req.body.quantity,
		totalSalePrice: medicine.salePrice * parseInt(req.body.quantity),
		totalCostPrice: medicine.costPrice * parseInt(req.body.quantity),
		date: date
	}
	saleData.totalProfit = saleData.totalSalePrice - saleData.totalCostPrice;

	await models.MedicineSale.create(saleData);

	var meds = await models.Medicine.findAll({});
	return res.json(meds);
})


router.get("/getMedicines", middleware.isLoggedIn, middleware.isPharmacist, async function(req,res){
	var meds = await models.Medicine.findAll({});
	return res.json(meds);
})




router.delete("/medicines/:id", middleware.isLoggedIn, middleware.isPharmacist, function (req, res) {
	models.Medicine.destroy({
			where: {
				medicineID: req.params.id
			}
		})
		.then(function () {
			res.redirect("/pharmacists/medicines");
		})
});

router.get("/medicines/:id/edit", middleware.isLoggedIn, middleware.isPharmacist, function (req, res) {
	models.Medicine.findOne({
			where: {
				medicineID: req.params.id
			}
		})
		.then(function (medicine) {
			res.render("Pharmacist/medicineEdit", {
				medicine: medicine
			})
		});
});

router.patch("/medicines/:id", middleware.isLoggedIn, middleware.isPharmacist, function (req, res) {
	models.Medicine.update({
			name: req.body.name,
			quantity: parseInt(req.body.quantity),
		}, {
			where: {
				medicineID: req.params.id
			}
		})
		.then(function (status) {
			console.log("Medicine Updated.")
			res.redirect("/pharmacists/medicines");
		})
});

router.get("/medicines/new", middleware.isLoggedIn, middleware.isPharmacist, function (req, res) {
	res.render("Pharmacist/medicineNew")
});

router.get("/salesInfo", middleware.isLoggedIn, middleware.isPharmacist, function(req,res){
	res.render("Pharmacist/salesInfo");
})

router.get("/sales", middleware.isLoggedIn, middleware.isPharmacist, async function(req,res){
	var startDate = req.query.startDate;
	var endDate = req.query.endDate;


	var sales = await sequelize.query('SELECT Medicines.name, SUM(MedicineSales.quantity) as quantity, SUM(MedicineSales.totalSalePrice) as sales, SUM(MedicineSales.totalCostPrice) as costs FROM MedicineSales LEFT OUTER JOIN Medicines USING (medicineID) WHERE MedicineSales.date BETWEEN "' + startDate + '" AND "' + endDate + '" GROUP BY Medicines.name',{type: sequelize.QueryTypes.SELECT});

	res.json(sales);

})

router.get("/invoiceNumber", middleware.isLoggedIn, middleware.isPharmacist, async function(req,res){
	var id = await sequelize.query("SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = 'MedicineSales' AND table_schema = DATABASE( )",{type: sequelize.QueryTypes.SELECT});
	return res.json(id);
})

module.exports = router;