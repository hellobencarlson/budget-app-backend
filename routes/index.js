const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const { validationResult, check } = require('express-validator');

const Account = require('../models').Account;
const Expense = require('../models').Expense;
const User = require('../models').User;

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(err){
      res.status(500).send(err);
      console.log(err.message);
    }
  }
}

const authenticateUser = asyncHandler(async (req, res, next) => {
  
  let message = null;

  const credentials = auth(req);
  

  if(credentials) {
 
    const user = await User.findAll({ where: {
      emailAddress: credentials.name
    }});
      
      if (user[0] != undefined) {
 
        authenticated = bcryptjs
             .compareSync(credentials.pass, user[0].dataValues.password);
        
          if (authenticated) {
              req.currentUser = user;
            
          } else {
            message = "Authentication failed for username: ${user.username}";
          }
      } else {
      message = "User not found for username: ${credentials.name}";
    }
  } else {
    message = "Authentication header not found";
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
  next();
  }
});

/* GET home page. */
router.get('/accounts', asyncHandler(async (req, res) => {
  const accounts = await Account.findAll();
  res.json({ accounts });
}));

// POST
router.post('/accounts', asyncHandler(async (req, res) => {
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
  const errorMessages = errors.array().map(error => error.msg);
  res.status(400).json({ errors: errorMessages });
 } else { 
  let newAccount;
  newAccount = await Account.create(req.body);
  res.location("/accounts");
  res.status(201).end();
 }
}));

router.get('/expenses', asyncHandler(async (req, res) => {
  const expenses = await Expense.findAll();
  res.json({ expenses });
}));


router.post('/expenses',  authenticateUser, [
  check('expenseName')
  .exists()
  .withMessage("Please add a name"),
check('expenseCost')
  .exists()
  .withMessage("Please add a cost")
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
  const errorMessages = errors.array().map(error => error.msg);
  res.status(400).json({ errors: errorMessages });
 } else { 
  let newExpense;
  newExpense = await Expense.create(req.body);
  res.location("/expenses");
  res.status(201).end();
 }
}));

router.delete('/accounts/:id', asyncHandler(async (req, res) => {
  const account = await Account.findByPk(req.params.id);
  account.destroy();
  res.status(200).end();

}));

router.delete('/expenses/:id', asyncHandler(async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);
  expense.destroy();
  res.status(200).end();

}));

router.put('/accounts/:id', [
  check('accountName')
  .exists()
  .withMessage("Please add an acount name"),
check('accountBalance')
  .exists()
  .withMessage("Please add account balance")
], asyncHandler(async (req, res) => {

  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      res.status(400).json({ errors: errorMessages });
    } else {
      // find course with id that matches
      const account = await Account.findByPk(req.params.id);
      // update course
      await account.update(req.body);
      res.status(204).end();
    }
}));

router.put('/expenses/:id', [
  check('expenseName')
  .exists()
  .withMessage("Please add an expense name"),
check('expenseCost')
  .exists()
  .withMessage("Please add expense cost")
], asyncHandler(async (req, res) => {

  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      res.status(400).json({ errors: errorMessages });
    } else {
      // find expense with id that matches
      const expense = await Expense.findByPk(req.params.id);
      // update expense
      await expense.update(req.body);
      res.status(204).end();
    }
}));

router.post('/users', [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please add your first name"),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please add your last name"),
  check('emailAddress')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please add your email")
    .isEmail()
    .withMessage("Please use a valid email"),
    // sequelize error also comes up if email not unique
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please add a password")
], asyncHandler(async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    res.status(400).json({ errors: errorMessages });
    
  } else {
    let user;
    // hash the password
    req.body.password = bcryptjs.hashSync(req.body.password);
    // create user
    user = await User.create(req.body);
    res.location("/");
    res.status(201).end();
}
}));



router.get('/users', authenticateUser,
asyncHandler(async (req, res) => {

  // get current user's id
  const userNow = req.currentUser[0].dataValues.id;


  // find user in database and return
  const user = await User.findAll({
    where: {
      id: userNow
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password']
    }
  });
  res.json({ user });
}));



module.exports = router;






