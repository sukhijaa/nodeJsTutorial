const {USER_ROLE, ADMIN_ROLE} = require("../utils/Roles");
var express = require('express');
var router = express.Router();
const {ALLOWED_USERNAMES, ALLOWED_PASSWORD} = require("../utils/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res) {
  const responseObj = {
    isError: false,
    errorMessage: "",
    loggedInDetails: {}
  };
  const loginData = req.body;
  const {userName, password} = loginData;

  if (!userName || !password) {
    responseObj.isError = true;
    responseObj.errorMessage = "Username or Password is Empty";
    res.json(responseObj);
    return;
  }

  const isUserNameValid = ALLOWED_USERNAMES.includes(userName);
  const isPasswordValid = ALLOWED_PASSWORD.includes(password);

  if (!isUserNameValid || !isPasswordValid) {
    responseObj.isError = true;
    responseObj.errorMessage = "Username/Password combination is not valid";
    res.json(responseObj);
    return;
  }

  if (userName.includes("admin")) {
    responseObj.loggedInDetails = {
      token: "9876543210",
      firstName: "fName",
      lastName: "lName",
      role: ADMIN_ROLE
    };
  } else {
    responseObj.loggedInDetails = {
      token: "1234567890",
      firstName: "fName",
      lastName: "lName",
      role: USER_ROLE
    };
  }

  res.json(responseObj);

});

router.post('/validateToken', function(req, res) {
  const responseObj = {
    isError: false,
    errorMessage: "",
    loggedInDetails: {}
  };
  const loginData = req.body;
  const {token} = loginData;

  if (!token) {
    responseObj.isError = true;
    responseObj.errorMessage = "Token is mepty";
    res.json(responseObj);
    return;
  }

  const isTokenValid = ["9876543210", "1234567890"].includes(token);

  if (!isTokenValid) {
    responseObj.isError = true;
    responseObj.errorMessage = "Invalid Token";
    res.json(responseObj);
    return;
  }

  if (token.includes("9876")) {
    responseObj.loggedInDetails = {
      token: "9876543210",
      firstName: "fName",
      lastName: "lName",
      role: ADMIN_ROLE
    };
  } else {
    responseObj.loggedInDetails = {
      token: "1234567890",
      firstName: "fName",
      lastName: "lName",
      role: USER_ROLE
    };
  }

  res.json(responseObj);

});

module.exports = router;
