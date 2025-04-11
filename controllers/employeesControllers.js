const data = {};
data.employees = require('../models/employees.json')

const getAllEmployees = (req,res)=>{
    res.json(data.employees)
}

const createNewEmployees = (req,res)=>{
    res.json({
        "firstName":req.body.firstName,
        "lastName":req.body.lastName
    });
}

const updateEmployees = (req,res)=>{
    res.json({
        "firstName":req.body.firstName,
        "lastName":req.body.lastName
    });
}

const partiallyUpdateEmployees = (req,res)=>{
    res.json({
        "firstName":req.body.firstName,
        "lastName":req.body.lastName
    });
}

const deleteEmployees = (req,res)=>{
    res.json({
        "id":req.body.id
    });
}

module.exports = {getAllEmployees,createNewEmployees,updateEmployees,partiallyUpdateEmployees,deleteEmployees}