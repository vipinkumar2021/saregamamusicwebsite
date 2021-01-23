var express = require('express');
var router = express.Router();

var customerModel = require('../modules/customersignupschema');

//encrypt passwords using bcrypt
var bcrypt = require('bcryptjs');
  /* GET home page. */
  router.get('/',  function(req, res, next) {
    var loginUser = localStorage.getItem('adminLoginUserName');
 
    if(loginUser) {
        res.render('dashboardaccountactivated', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser});
      } else {
        res.redirect('admin');
      }   
    });    
 
 
  

 
module.exports = router;
