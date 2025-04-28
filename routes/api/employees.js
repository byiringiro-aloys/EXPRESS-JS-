const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesControllers');
const verifyJWT = require('../../middleware/verifyJWT');
const rolesList = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles')


router.route('/')
        .get(employeesController.getAllEmployees)
        .post(verifyRoles(rolesList.Admin,rolesList.Editor),employeesController.createNewEmployees)
        .put(verifyRoles(rolesList.Admin,rolesList.Editor),employeesController.updateEmployees)
        .patch(verifyRoles(rolesList.Admin,rolesList.Editor),employeesController.partiallyUpdateEmployees)
        .delete(verifyRoles(rolesList.Admin),employeesController.deleteEmployees);

router.route('/:id')
        .get(employeesController.getAnEmployees)

module.exports = router