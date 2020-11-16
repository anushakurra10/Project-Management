

const User = require("../models/auth");
const login = (req, res, next) => {
  let userName = req.body.name;
  let password = req.body.password;

  return User.findOne({ userName, password }).then(user => {
    if (!user) {
      message = "User not Found"
      return res.status(404).send({ message, code: 404, success: false, data: null });
    }
    res.status(200).send({
      message: user,
      success: true,
      code: 200,
    });
  })
    .catch(e => {
      console.log(e)
      res.status(400).send(e);
    });
};

const signup = (req, res, next) => {
  let userName = req.body.name;
  let password = req.body.password;
  let role = req.body.role;
  let newUser = new User({ userName, password, role });

  return newUser
    .save()
    .then((user) => {
      res.send({
        message: "Welcome! you have signed up successfully",
        success: true,
        code: 200,
      });
    })
    .catch(err => {

      if (err.name === 'MongoError' && err.code === 11000) {
        console.log(err)
        return res.status(422).send({ succes: false, message: 'User already exists !! please try with different user name' });
      }
      res.status(400).send(err);
    });
};

const getEmployees = (req, res, next) => {
  return User.find({ role: 'Employee' }).select('userName').then(users => {
    if (!users) {
      message = "No,Employees.Signup some employees then assign the tasks"
      return res.status(404).send({ message, code: 404, success: false, data: null });
    }

    res.status(200).send({
      message: users,
      success: true,
      code: 200,
    });
  })
    .catch(e => {
      console.log(e)
      res.status(400).send(e);
    });
};


module.exports = {
  login,
  signup,
  getEmployees
};
