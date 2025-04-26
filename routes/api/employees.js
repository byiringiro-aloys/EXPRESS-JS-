const express = require('express')
const router = express.Router()
const employeesController = require('../../controllers/employeesControllers')
const verifyJWT = require('../../middleware/verifyJWT')

const data = {};
data.employees = require('../../models/employees.json')
router.route('/')
        .get(verifyJWT,employeesController.getAllEmployees)
        .post(employeesController.createNewEmployees)
        .put(employeesController.updateEmployees)
        .patch(employeesController.partiallyUpdateEmployees)
        .delete(employeesController.deleteEmployees);

router.route('/:id')
        .get(employeesController.getAnEmployees)

module.exports = router