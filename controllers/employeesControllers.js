const Employee = require('../models/Employees')

const getAllEmployees = async (req,res)=>{
    const Employees = await Employee.find().exec();
    if(!Employees){
        res.status(204).json({})
    }
    res.status(200).json(Employees)
}
const getAnEmployees = async (req, res) => {
    const employee = await Employee.findOne({_id:req.params.Id}).exec();
    if (!employee) {
        res.status(404).json({ "message": `Employee with Id ${req.params.id} doesn't exist.` })
    }
    res.status(200).json(employee)
}

const createNewEmployees = async (req, res) => {
    const {firstName,lastName} = req.body;
    if (!firstName || !lastName) {
        res.status(400).json({ "error": "Both firstName and the lastName are required." })
    }
    else{
        const newEmployee = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        if(newEmployee)res.status(201).json({"message":`New employee ${newEmployee.firstName} created successfully.`});        
    }
}

const updateEmployees = async (req, res) => {
    const employee = await Employee.findOne({_id:req.body.id}).exec();
    if (!employee) {
        res.status(404).json({ "message": `Id ${req.body.id} for the employee doesn't exist` })
    }
    if (req.body.firstName) employee.firstName = req.body.firstName
    if (req.body.lastName) employee.lastName = req.body.lastName
    employee.save();
    res.status(200).json(employee);

}

const partiallyUpdateEmployees = async (req, res) => {
    const employee = await Employee.findOne({_id:req.body.id})
    if (!employee) {
        res.status(400).json({ "message": `Id ${req.body.id} for the employee doesn't exist` })
    }
    if (req.body.firstName) employee.firstName = req.body.firstName
    if (req.body.lastName) employee.lastName = req.body.lastName
    employee.save()
    res.json(employee)
}

const deleteEmployees = async (req, res) => {
    try {
        const employee = await Employee.findById(req.body.id);
        if (!employee) {
            return res.status(404).json({ message: `Employee with ID ${req.body.id} not found.` });
        }
        await employee.deleteOne();
        res.status(200).json({ message: "Deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error.", error: err.message });
    }
};


module.exports = { getAnEmployees, getAllEmployees, createNewEmployees, updateEmployees, partiallyUpdateEmployees, deleteEmployees }