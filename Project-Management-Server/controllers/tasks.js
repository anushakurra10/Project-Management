const Task = require("../models/task.model");
const User = require("../models/auth");
const mongoose = require('mongoose');

const createTask = (req, res, next) => {
    let data = req.body.userdata;
    data.employees.forEach((element, i) => {
        let newTask = new Task(req.body.userdata);
        newTask.employee_id = element._id;
        newTask.employee_name = element.userName;
        newTask.save().then((task) => {
            if (i == data.employees.length - 1) {
                res.send({
                    message: "Saved successfuly",
                    success: true,
                    code: 200,
                });
            }
        });

    });

};

const getTasks = (req, res, next) => {
    return Task.find({ managerId: req.params.managerId }).then(task => {
        res.send({
            message: task,
            success: true,
            code: 200,
        });
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
}

const getTaskDetails = (req, res, next) => {
    return Task.findOne({ _id: req.params.taskId }).then(task => {
        res.send({
            message: task,
            success: true,
            code: 200,
        });
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
}



const updateTaskDetails = (req, res, next) => {
    let emp = req.body.userdata.employees;
    let count = 0;
    let promises = [];

    emp.forEach((element, i) => {
        promises.push(Task.findOne({ employee_id: element._id, _id: req.body.userdata._id }, function (err, task) {
            if (task) {
                Task.findByIdAndUpdate({ _id: req.params.taskId }, {
                    $set: {
                        title: req.body.userdata.title,
                        description: req.body.userdata.description,
                        dueDate: req.body.userdata.dueDate,
                        employee_id: element._id,
                        employee_name: element.userName,
                        status: req.body.userdata.status,
                        notes: req.body.userdata.notes,
                        managerId: req.body.userdata.managerId
                    }
                }, function (err, task) {
                    console.log("222222", err, task)
                });
                count++;
            } else {

                Task.create({
                    title: req.body.userdata.title,
                    description: req.body.userdata.description,
                    dueDate: req.body.userdata.dueDate,
                    employee_id: element._id,
                    employee_name: element.userName,
                    notes: '',
                    managerId: req.body.userdata.managerId
                })
            }
        }));

    });
    Promise.all(promises).then((resp, err) => {
        if (count == 0) {
            Task.deleteOne({ _id: req.body.userdata._id }, function (err, del) {
                console.log(err, del)
            });
        }
        res.send({
            message: "Saved successfuly",
            success: true,
            code: 200,
        });
    });

};


const getEmpoyeeTask = (req, res, next) => {
    return Task.find({ employee_id: req.params.taskId }).then(task => {
        res.send({
            message: task,
            success: true,
            code: 200,
        });
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
}

const updateEmpoyeeTask = (req, res, next) => {
    req.body.userdata.forEach((element, i) => {
        return Task.findByIdAndUpdate(element._id, { $set: { status: element.status, notes: element.notes } })
            .then((err, task) => {
                if (i == req.body.userdata.length - 1) {
                    res.send({
                        message: task,
                        success: true,
                        code: 200,
                    });
                }
            }).catch(e => {
                console.log(e)
                res.status(400).send(e);
            });

    });
}

module.exports = {
    createTask,
    getTasks,
    getTaskDetails,
    updateTaskDetails,
    getEmpoyeeTask,
    updateEmpoyeeTask
};

