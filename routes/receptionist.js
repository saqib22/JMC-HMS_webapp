var express = require("express");
var router = express.Router();
var models = require("../app.js");
var middleware = require("../middleware");
var User = models.User;
var Patient = models.Patient;
var Medicine = models.Medicine;
var Counselor = models.Counselor;
var Appointment = models.Appointment;
var Prescription = models.Prescription;


var arraySort = require("array-sort");


const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
function formatDate(date){
    return ('{0}-{1}-{3} {4}:{5}:{6}').replace('{0}', date.getFullYear()).replace('{1}', date.getMonth() + 1).replace('{3}', date.getDay()).replace('{4}', date.getHours()).replace('{5}', date.getMinutes()).replace('{6}', date.getSeconds())
}

router.get("/dateInfo", async function(req,res){
    console.log("===========================");
    console.log("Running date route");
    console.log("===========================");
    var date = req.query.date;
    var response = await models.Checkup.findAll({
        where: {
            createDate: date
        }, include:[{model: models.Doctor}, {model: models.Patient}]
    })

    res.json(response);
});

router.get("/patientsInfo", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    var patients = await models.Patient.findAll();
    res.json(patients);
})

router.get("/getPatients", middleware.isLoggedIn, middleware.isReceptionist, async function (req,res){
    res.render("Receptionist/viewPatients");
});



router.get("/newPatient", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    res.render("Receptionist/addPatient");
})

router.post("/newPatient", middleware.isLoggedIn,middleware.isReceptionist, async function(req,res){

    console.log("Patient Data:", req.body);
    var existing = await models.Patient.findAll({
        where: {
            phone: req.body.phone
        }
    })
    console.log("existing");
    console.log(existing);
    
    if (existing.length > 0){return res.send("-1")}
    var datetime = new Date().toISOString();
    var date = datetime.slice(0,(datetime.indexOf('T')));
    var data = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        registrationDate: date
    }
    if (req.body.cnic){data.cnic = req.body.cnic;}
    if (req.body.birthDate){data.birthDate = req.body.birthDate;}

    await models.Patient.create(data);
    return res.send("1");

})

router.post("/newCheckup", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    console.log(req.body);


    var data = {
        patientID: req.body.patient,
        doctorID: req.body.doctor,
        baseFee: req.body.fee,
        additional: req.body.additional,
        subtract: req.body.subtract,
        discount: req.body.discount,
        createDate: req.body.createDate,
        lab: req.body.lab,
        labFee: req.body.labFee,
        labShare: req.body.labShare
    }

    console.log(req.body.fee);
    console.log(req.body.doctorshare);

    if (req.body.notes){data.notes = req.body.notes}
    data.totalFee = (parseFloat(data.baseFee) + parseFloat(data.additional) - parseFloat(data.subtract))*((100-parseFloat(data.discount))/100);
    data.doctorShare = (parseFloat(req.body.doctorshare)/100) * data.totalFee;

    //if(data.lab){data.labShare = Math.floor(parseInt(data.labFee)*(100/parseInt(req.body.labShare)));} else {data.labShare = 0}

    console.log(data.totalFee);
    console.log(data.doctorShare);


    console.log("================================");
    console.log("RUNNING ROUTE");
    console.log("================================");
    console.log(data);

    // CREATE NEW ENTRY IN DATABASE
    try{
        await models.Checkup.create(data);
    }
    catch(err){
        console.log("ERROR");
        console.log(err);
        res.send("-1");
    }

    var doctor = await models.Doctor.findOne({where:{
        doctorID: req.body.doctor
    }});

    console.log(doctor);

    doctor.dues = parseInt(doctor.dues) + parseInt(data.doctorShare) + parseInt(data.labShare);
    await doctor.save();
    return res.sendStatus(200);
    
});

router.post("/users/newDoctor", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    console.log(req.body);
    var data = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        gender: req.body.gender,
        phone: req.body.phone,
        fee: req.body.fee,
        share: req.body.share,
        labShare: req.body.labShare,
        birthDate: req.body.dob,
        specialization: req.body.specialization,
        createDate: req.body.createDate
    }

    if (req.body.cnic){data.cnic = req.body.cnic;}
    if (req.body.address){data.address = req.body.address;}


    console.log("================================");
    console.log("RUNNING DOCTOR CREATE ROUTE");
    console.log("================================");
    console.log(data);

    // CREATE NEW ENTRY IN DATABASE
    try{
        await models.Doctor.create(data);
        res.sendStatus(200);
    }
    catch(err){
        console.log("ERROR");
        console.log(err);
        res.send("-1");
    }
    
});




router.get("/users/doctorData", async function(req,res){
    var doctors = await models.Doctor.findAll({});
    var doctorData = {};
    for (var i = 0; i < doctors.length; i++){
        var doctor = doctors[i];
        console.log(doctor);
        doctorData[doctor.doctorID] = {
            fee: doctor.fee,
            share: doctor.share,
            labShare: doctor.labShare   
        };
 
    }
    res.json(doctorData);
})

router.get("/users/new", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    var data;
    if (req.query.data){
        console.log("======== query found =======");
        data = await models.Patient.findOne({where: {
            patientID: req.query.data
        }})
        console.log(data);
    } else {data = null;}
    console.log("============= DATA ==============");
    console.log(req.query.data);
    console.log(data);
    var doctors = await models.Doctor.findAll({});
    console.log(doctors);
    res.render("Receptionist/register", {doctors: doctors, data:data});
})

router.get("/users/newDoctor", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    res.render("Receptionist/addDoctor");
});

router.get("/doctorShares", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    res.render("Receptionist/doctorShares");
})

router.get("/users/doctorShares", middleware.isLoggedIn, middleware.isReceptionist,async function(req,res){
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;


    var result = await sequelize.query('SELECT SUM(totalFee) as total, SUM(doctorShare) as share, SUM(Checkups.labFee) as labFee, SUM(Checkups.labShare) as labShare, Doctors.doctorID, Doctors.firstName, Doctors.lastName, Doctors.specialization, Doctors.dues as dues FROM Checkups INNER JOIN Doctors USING(doctorID) WHERE createDate BETWEEN "' + startDate + '" AND "' + endDate + '" GROUP BY doctorID, Doctors.firstName, Doctors.lastName, Doctors.specialization, Doctors.dues;', { type: sequelize.QueryTypes.SELECT});
    res.json(result);
    // res.render("Receptionist/doctorShares", {data:result});
})

    


router.get("/users/patients", middleware.isLoggedIn, middleware.isReceptionist, function (req, res) {
    models.Patient.findAll({include: [{
        model: models.User,
    }]}).then(function (patients) {
        
        res.render("Receptionist/patients", {patients:patients});
    });
});

router.get("/rooms", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Room.findAll().then(function(rooms){
        res.render("Receptionist/rooms", {rooms: rooms});
    })
    
})


router.post("/rooms/new", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Room.create({
        roomNumber: parseInt(req.body.roomNo),
        floor: parseInt(req.body.floor),
        isVacant: true
    }).then(function(room){
        res.redirect("/receptionist/rooms");
    }).catch(function(){
        res.send("ERROR. Make sure Room number is correct and unique.")
    })
})

router.get("/rooms/new", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    res.render("Receptionist/newRoom");
})

router.delete("/rooms", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Room.destroy({
        where: {roomNumber: req.body.id}
    }).then(function(){
        res.send("1");
    })
})

router.get("/users/patients/:id", middleware.isLoggedIn, middleware.isReceptionist, function (req, res) {

    models.User.findById(req.params.id).then(function (user) {
        models.Patient.findOne({
            where: {
                userID: req.params.id
            }
        }).then(function (patient) {
            res.render("Receptionist/showPatient", {
                patient: patient,
                user: user
            });
        })
    })
});


router.delete("/users/patients/:id", middleware.isLoggedIn, middleware.isReceptionist, function (req, res) {
    models.Patient.destroy({
        where: {
            userID: req.params.id
        }
    }).then(function () {
        models.User.destroy({
            where: {
                userID: req.params.id
            }
        }).then(function () {
            res.redirect("/receptionist/users/patients");
        });
    });
});

router.get("/users/:id/edit", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.User.findById(req.params.id).then(function(user){
        if(user.userType === "Patient"){
            models.Patient.findById(user.userID).then(function(patient){
                res.render("Receptionist/editUser", {user:user, subclass: patient});
            })
        }
        if(user.userType === "Doctor"){
            models.Doctor.findById(user.userID).then(function(doctor){
                res.render("Receptionist/editUser", {user:user, subclass: doctor});
            })
        } 
        if(user.userType === "Counselor"){
            models.Counselor.findById(user.userID).then(function(counselor){
                res.render("Receptionist/editUser", {user:user, subclass: counselor});
            })
        } 
        if(user.userType === "Pharmacist"){
            models.Pharmacist.findById(user.userID).then(function(pharmacist){
                res.render("Receptionist/editUser", {user:user, subclass: pharmacist});
            })
        } 
        if(user.userType === "Receptionist"){
            models.Receptionist.findById(user.userID).then(function(receptionist){
                res.render("Receptionist/editUser", {user:user, subclass: receptionist});
            })
        } 
    })
})

router.post("/users/:id/edit", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.User.findById(req.params.id).then(function(user){

    
        if(user){
            user.updateAttributes({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                cnic: req.body.cnic,
                gender: req.body.gender,
                phone: req.body.phone,
                birthDate: req.body.birthDate,
                email: req.body.email,
                
            })
            if (user.userType === "Patient"){
                models.Patient.findById(user.userID).then(function(patient){

                
                    patient.updateAttributes({
                        counselorID: req.body.counselorID
                    })
                })
            
            } else if (user.userType === "Doctor"){
                models.Doctor.findById(user.userID).then(function(doctor){
                    doctor.updateAttributes({
                        workHours: req.body.hours,
                        specialization: req.body.specialization
                    })
                })
                    
            
        }
        res.redirect("/receptionist/users");
     }
      else {
            res.send("Invalid ID");
        }
    })
});

router.put("/users/edit/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.User.findById(req.params.id).then(function(user){
        if(user){
            user.updateAttributes({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                cnic: req.body.cnic,
                gender: req.body.gender,
                phone: req.body.phone,
                birthDate: req.body.birthDate,
                email: req.body.email   
            })
        }
    })
})

router.delete("/users/pharmacists/:id", middleware.isLoggedIn, middleware.isReceptionist, function (req, res) {
    models.Pharmacist.destroy({
        where: {
            userID: req.params.id
        }
    }).then(function () {
        models.User.destroy({
            where: {
                userID: req.params.id
            }
        }).then(function () {
            res.redirect("/receptionist/users/pharmacists");
        });
    });
});

router.get("/users/doctors", function (req, res) {
    models.Doctor.findAll({include: [{
        model: models.User,
    }]}).then(function (doctors) {
        
        res.render("Receptionist/doctors", {doctors:doctors});
    });
});

router.get("/users/doctors/:id", middleware.isLoggedIn, middleware.isReceptionist, function (req, res) {
    
        models.User.findById(req.params.id).then(function (user) {
            models.Doctor.findOne({
                where: {
                    userID: req.params.id
                }
            }).then(function (doctor) {
                res.render("Receptionist/showDoctor", {
                    doctor: doctor,
                    user: user
                });
            })
        })
    });

router.delete("/users/doctors/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Doctor.destroy({
        where: {
            userID: req.params.id
        }
    }).then(function () {
        models.User.destroy({
            where: {
                userID: req.params.id
            }
        }).then(function(){
            res.redirect("/receptionist/users/doctors");
        })
    })
});

router.get("/users/counselors", function (req, res) {
    models.Counselor.findAll({include: [{
        model: models.User,
    }]}).then(function (counselors) {
        
        res.render("Receptionist/counselors", {counselors:counselors});
    });
});

router.get("/users/counselors/:id", middleware.isLoggedIn, middleware.isReceptionist, function (req, res) {
    
    models.User.findById(req.params.id).then(function (user) {
        models.Counselor.findOne({
            where: {
                userID: req.params.id
            }
        }).then(function (counselor) {
            res.render("Receptionist/showCounselor", {
                counselor: counselor,
                user: user
            });
        })
    })

});

router.delete("/users/counselors/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Counselor.destroy({
        where: {
            userID: req.params.id
        }
    }).then(function () {
        models.User.destroy({
            where: {
                userID: req.params.id
            }
        }).then(function(){
            res.redirect("/receptionist/users/counselors");
        })
    })
});

router.get("/users/pharmacists", middleware.isLoggedIn, middleware.isReceptionist,function (req, res) {
    models.Pharmacist
    
    
    .findAll({include: [{
        model: models.User,
    }]}).then(function (pharmacists) {
        res.render("Receptionist/pharmacists", {pharmacists:pharmacists});
    });
});

router.get("/users/pharmacists/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.User.findById(req.params.id).then(function (user) {
        models.Pharmacist.findOne({
            where: {
                userID: req.params.id
            }
        }).then(function (pharmacist) {
            res.render("Receptionist/showPharmacist", {
                pharmacist: pharmacist,
                user: user
            });
        })
    })

});


router.get("/appointments/new", middleware.isLoggedIn, middleware.isReceptionist, async function (req, res) {
    
    var doctors = await models.Doctor.findAll();
    console.log(doctors);
    res.render("Receptionist/newAppointment", {doctors: doctors});
});

router.post("/appointments", middleware.isLoggedIn, middleware.isReceptionist, async    function (req, res) {

    if(isNaN(req.body.patientID)){
        return res.send("-1");
    }

    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var notes = req.body.notes;
    var patientID = req.body.patientID;
    var doctorID = req.body.doctorID;

    var data = {
        startDate: startDate,
        endDate: endDate,
        patientID: patientID,
        doctorID: doctorID
    };

    if (notes){data.notes = notes};


    await models.Appointment.create(data)
    return res.send("1");

});

router.get("/appointments", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    res.render("Receptionist/appointments");
});

router.get("/activeAppointments", middleware.isLoggedIn, middleware.isReceptionist, function (req, res) {
    models.Appointment.findAll({
        where: {
            isActive: true
        }
    }).then(function (appointments) {
        res.render("Receptionist/activeAppointments", {
            appointments: appointments
        });
    });
});


router.get("/oldAppointments", middleware.isLoggedIn, middleware.isReceptionist, function (req, res) {
    models.Appointment.findAll({
        where: {
            isActive: false
        }
    }).then(function (appointments) {
        res.render("Receptionist/oldAppointments", {
            appointments: appointments
        });
    });
});

router.get("/appointments/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Appointment.findById(req.params.id).then(function(appointment){
        console.log("======================");
        console.log(appointment.date);
        console.log("======================");
        if(appointment){
        models.Patient.findById(appointment.patientID).then(function(patient){
            models.User.findById(patient.userID).then(function(patientUser){
                if(appointment.doctorID){
                    type = "doctor";
                    models.Doctor.findById(appointment.doctorID).then(function(doctor){
                        models.User.findById(doctor.userID).then(function(doctorUser){
                            res.render("Receptionist/showAppointment", {appointment:appointment, patient: patient, doctor:doctor, patientUser:patientUser, doctorUser: doctorUser});
                        })
                        
                    });
                }
                else{
                    type = "counselor"
                    models.Counselor.findById(appointment.counselorID).then(function(counselor){
                        models.User.findById(counselor.userID).then(function(counselorUser){
                            res.render("Receptionist/showCounselorAppointment", {appointment: appointment, patient: patient, counselor:counselor, patientUser:patientUser, counselorUser: counselorUser});
                        })
                        
                    })
                }
            })

            
        })
    }
    else {
        res.send("No appointment with that ID exists.");
    }
    });
});

router.get("/admissions", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    res.render("Receptionist/admissions");
});

router.get("/activeAdmissions", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Admission.findAll({where: {isActive: true}}).then(function(admissions){
        res.render("Receptionist/showAdmissions", {admissions:admissions});
    });
});

router.get("/oldAdmissions", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Admission.findAll({where: {isActive: false}}).then(function(admissions){
        res.render("Receptionist/showAdmissions", {admissions:admissions});
    });
});

router.post("/completeAdmission/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Admission.findById(req.params.id).then(function(admission){
        if(admission){
        admission.updateAttributes({isActive: false});
        models.Room.findById(admission.roomNumber).then(function(room){
            room.updateAttributes({isVacant: true});
            res.send("1");
        })
        }
        else{
            res.send("Invalid admission ID");
        }
    });
});


router.delete("/deleteAdmissionActive/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Admission.findById(req.params.id).then(function(admission){
       if(admission){
            models.Room.findById(admission.roomNumber).then(function(room){
                room.updateAttributes({isVacant: true});
                models.Admission.destroy({where: {admissionID: req.params.id}}).then(function(){
                    res.send("1");
                })
            })
       }
       else {
           res.send("Invalid admission ID");
       }
        
    })
    
});

router.delete("/deleteAdmissionOld/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    models.Admission.destroy({where: {admissionID: req.params.id}}).then(function(){
        
         models.Admission.destroy({where: {admissionID: req.params.id}}).then(function(){
            res.send("1");
         })
    })
});


router.delete("/appointments/:id", middleware.isLoggedIn, middleware.isReceptionist, function(req,res){
    console.log("Reached delete route");
    models.Appointment.destroy({where: {appointmentID: req.params.id}}).then(function(){
        res.send("1");
    })
});

router.get("/patient", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    console.log("RUNNING PHONE ROUTE");
    var phone = req.query.phone;
    if (!(isNaN(phone))){
        var patient = await models.Patient.findAll({
        where: {
            phone: phone
        }
        });

        if (patient.length === 0){
            return res.send("-1");
        }
        else{
            return res.json(arraySort(patient, "createDate")[0])
        };
    }
    else {
        var patient = await sequelize.query('SELECT * FROM Patients WHERE CONCAT(firstName," " ,lastName) LIKE "' + phone +'"', {type: sequelize.QueryTypes.SELECT});
        if (patient.length === 0){
            return res.send("-1");
        }
        else{
            return res.json(arraySort(patient, "createDate")[0])
        };
    }

    
})

router.get("/getAppointments", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    var appointments = await models.Appointment.findAll({
        where: {
            endDate: {
                [Op.gt]: new Date().toISOString()
            }
        }, include:[{model: models.Doctor}, {model: models.Patient}]
    });

    var sortedAppointments = arraySort(appointments, "endDate");

    res.render("Receptionist/viewAppointments", {appointments: sortedAppointments});

    
});

router.get("/specializations", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    var specializations = await sequelize.query("SELECT specialization FROM Doctors GROUP BY specialization", {type: sequelize.QueryTypes.SELECT});
    res.json(specializations);
});

router.get("/doctors", middleware.isLoggedIn, middleware.isReceptionist, async function (req,res){
    var doctors = await models.Doctor.findAll();
    res.render("Receptionist/doctors", {doctors: doctors});
})

router.get('/doctorsInfo', middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    var doctors = await models.Doctor.findAll();
    res.json(doctors);
})

router.get("/dues", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    res.render("Receptionist/doctorDues");
})

router.post("/dues", middleware.isLoggedIn, middleware.isReceptionist, async function(req,res){
    var dues = req.body.dues
    var paid = req.body.paid;
    var doctorID = req.body.doctor


    var doctor = await models.Doctor.findOne({
        where: {doctorID: doctorID}
    });

    doctor.dues = parseInt(doctor.dues) - parseInt(paid);
    await doctor.save();

    var doctors = await models.Doctor.findAll();
    res.json(doctors);
})

module.exports = router;