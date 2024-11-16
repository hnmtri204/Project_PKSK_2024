const express = require("express");
const router = express.Router();
const {
  createPatient,
  findAllPatient,
  findPatient,
  updatePatient,
  deletePatient,
  getPatientById
} = require("../controllers/PatientController/index");

// Định nghĩa route
router.post("/create", createPatient);
router.get("/find-all", findAllPatient);
router.get("/find/:id", findPatient);
router.put("/update/:id", updatePatient);
router.delete("/delete/:id", deletePatient);
router.get("/get-patient-dashboard/:id", getPatientById);

module.exports = router;
