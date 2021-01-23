var express = require('express');
var router = express.Router();

var outboxModel = require('../modules/outboxschema');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');
  /* GET home page. */
  router.get('/',  function(req, res, next) {
    var loginUser = {
      loginUserCustomer: localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: localStorage.getItem('adminLoginUserName')
    };

    

      if(loginUser.loginUserCustomer) {
        res.render('deleteprofile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserCustomer });
      } else if(loginUser.loginUserEmployee){
        res.render('deleteprofile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserEmployee });
      } else if(loginUser.loginUserAdmin) {
        res.render('deleteprofile', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser.loginUserAdmin});
      } else {
        res.redirect('/');
      }   
        
  });
  

 
module.exports = router;
