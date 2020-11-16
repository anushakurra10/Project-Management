const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const tasksController = require('../controllers/tasks');


router.post('/login/', authController.login);
router.post('/signup/', authController.signup);
router.get('/getEmployees/', authController.getEmployees);
router.post('/tasks/create/', tasksController.createTask);
router.get('/tasks/:managerId/', tasksController.getTasks);
router.get('/taskDetails/:taskId/', tasksController.getTaskDetails);
router.patch('/tasks/:taskId/', tasksController.updateTaskDetails);
router.get('/EmployeeTask/:taskId/', tasksController.getEmpoyeeTask);
router.patch('/UpdateEmployeeTask/:empId/', tasksController.updateEmpoyeeTask);

module.exports = router;