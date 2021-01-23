var express = require('express');
var router = express.Router();

//var websitefeatureslistModel = require('../modules/websitefeatureslistschema');
var cartItemsModel = require('../modules/cartitemsschema');
/* GET home page. */
router.get('/',  function(req, res, next) {
  var loginUserCustomer = localStorage.getItem('customerLoginUserName');
  var loginUserEmployee = localStorage.getItem('employeeLoginUserName');
  var loginUserAdmin = localStorage.getItem('adminLoginUserName');
  
  if(loginUserCustomer){
    res.redirect('/dashboardcustomer');
  } else if(loginUserEmployee) {
    res.redirect('/dashboardemployees');
  } else if(loginUserAdmin) {
    res.redirect('/dashboardadmin');
  } else {
    res.render('getstarted', { title: 'Front End Web Developer', msg:'', websiteFeaturesListData: ''});
  }  
});



module.exports = router;
