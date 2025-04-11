const express = require('express')
const router = express.Router()
const employeesController = require('../../controllers/employeesControllers')

const data = {};
data.employees = require('../../models/employees.json')
router.route('/')
        .get(employeesController.getAllEmployees)
        .post(employeesController.createNewEmployees)
        .put(employeesController.updateEmployees)
        .patch(employeesController.partiallyUpdateEmployees)
        .delete(employeesController.deleteEmployees);

router.route('/:id')
        .get(employeesController.getAllEmployees)

module.exports = router