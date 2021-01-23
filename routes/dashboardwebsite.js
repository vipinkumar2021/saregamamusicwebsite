var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',  function(req, res, next) {
  var loginUser = {
    loginUserCustomer: localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee){
    res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin});
  } else {
    res.redirect('index');
  }
});


module.exports = router;
