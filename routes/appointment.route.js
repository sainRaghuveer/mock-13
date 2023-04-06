const express = require("express");
const { appointmentModel } = require("../models/appointment.model");

const appointmentRoute = express.Router();

appointmentRoute.post("/data", (req, res) => {
    const { name, image, specialization, experience, location, date, slots, fee } = req.body;

    const appointmentData = new appointmentModel({ name, image, specialization, experience, location, date:new Date(), slots, fee });

    appointmentData.save();
    res.send({ "msg": "Appointment data has been added" })

})

appointmentRoute.get("/alldata", async (req, res) => {
    try {
        const allData = await appointmentModel.find();
        res.send({ "msg": allData })
    } catch (error) {
        res.send({ "msg": error.message })
    }
})

appointmentRoute.get("/filter", async (req, res) => {
    const { specialization } = req.body;
    console.log(specialization)

    try {
        if (specialization == "Cardiologist") {
            const filterData = await appointmentModel.find({ "specialization": "Cardiologist" });
            res.send({ "msg": filterData })
        } else if (specialization == "Dermatologist") {
            const filterData = await appointmentModel.find({ "specialization": "Dermatologist" });
            res.send({ "msg": filterData })
        } else if (specialization == "Pediatrician") {
            const filterData = await appointmentModel.find({ "specialization": "Pediatrician" });
            res.send({ "msg": filterData })
        } else if (specialization == "Psychiatrist") {
            const filterData = await appointmentModel.find({ "specialization": "Psychiatrist" });
            res.send({ "msg": filterData })
        }

    } catch (error) {
        res.send({ "msg": error.message })
    }
})

appointmentRoute.get("/doctor", async (req, res) => {
    const { name } = req.body;

    try {
        const doctorData = await appointmentModel.find({ name });
        res.send({ "msg": doctorData })
    } catch (error) {
        res.send({ "msg": error.message })
    }
})





module.exports = {
    appointmentRoute
}

