const data = {
    employees: require('../models/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req,res)=>{
    res.status(200).json(data.employees)
}
const getAnEmployees = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    if (!employee) {
        res.status(404).json({ "message": `Id ${req.params.id} for the employee doesn't exist` })
    }
    res.status(200).json(employee)
}

const createNewEmployees = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    if (!newEmployee.firstName || !newEmployee.lastName) {
        res.status(400).json({ "error": "Both firstName and the lastName are required." })
    } else {
        data.setEmployees([...data.employees, newEmployee])
        res.status(201).send(data.employees)

    }
}

const updateEmployees = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if (!employee) {
        res.status(404).json({ "message": `Id ${req.body.id} for the employee doesn't exist` })
    }
    if (req.body.firstName) employee.firstName = req.body.firstName
    if (req.body.lastName) employee.lastName = req.body.lastName
    // const filteredArray = data.employees.filter(emp=>emp.id !== parseInt(req.body.id))
    // const unsortedArray = [...filteredArray,employee]
    // data.setEmployees(unsortedArray.sort((a,b)=>{a.id > b.id ? 1 : a.id < b.id ? 0 : -1}))
    res.json(data.employees)

}

const partiallyUpdateEmployees = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if (!employee) {
        res.status(400).json({ "message": `Id ${req.body.id} for the employee doesn't exist` })
    }
    if (req.body.firstName) employee.firstName = req.body.firstName
    if (req.body.lastName) employee.lastName = req.body.lastName
    // const filteredArray = data.employees.filter(emp=>emp.id !== parseInt(req.body.id))
    // const unsortedArray = [...filteredArray,employee]
    // data.setEmployees(unsortedArray.sort((a,b)=>{a.id > b.id ? 1 : a.id < b.id ? 0 : -1}))
    res.json(data.employees)
}

const deleteEmployees = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if (!employee) {
        res.status(404).json({ 'message': `That ${req.body.id} is not found.` })
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    data.setEmployees([...filteredArray])
    res.json(data.employees)
}

module.exports = { getAnEmployees, getAllEmployees, createNewEmployees, updateEmployees, partiallyUpdateEmployees, deleteEmployees }