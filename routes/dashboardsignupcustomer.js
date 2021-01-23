var express = require('express');
var router = express.Router();

var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');

// require dot env
require('dotenv').config();
//Crypto for creating randombytes key
var crypto = require('crypto');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');

//encrypt passwords using bcrypt
var bcrypt = require('bcryptjs');


  /* GET home page. */
  router.get('/',  function(req, res, next) {
    var loginUser = localStorage.getItem('adminLoginUserName');
 
    if(loginUser) {
        res.render('dashboardsignupcustomer', { title: 'SareGaMa Music Academy & GMP Studio', msg:'', loginUser: loginUser});
      } else {
        res.redirect('admin');
      }   
    });   
    
    
  //dashboard admin create profile for customer starts
//Middleware Check username Exactly Correct One
function checkUsername(req, res, next) {
  var loginUser = localStorage.getItem('adminLoginUserName');

  var username = req.body.usrname;
  var getCustomerData = customerModel.findOne({Username: username});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData) {

      return res.render('createprofile', {title: 'Front End Web Developer', msg: 'Username Already Exists', loginUser: loginUser});
    
    }     
    if(!customerData) {

      var getEmployeeData = employeesModel.findOne({Username: username});
      getEmployeeData.exec((err, employeeData) => {
        if(err) throw err;
        if(employeeData) {

        return res.render('createprofile', {title: 'Front End Web Developer', msg: 'Username Already Exists', loginUser: loginUser});
 
      }
      if(!employeeData) {

        var getAdminData = adminModule.findOne({Username: username});
        getAdminData.exec((err, adminData) => {
          if(err) throw err;
          if(adminData) {

            return res.render('createprofile', {title: 'Front End Web Developer', msg: 'Username Already Exists', loginUser: loginUser});
 
          }
          next();
        });
      }
      });
    }
    //
  });
 }
//Middleware Check Mobile Number Exactally Correct One
function checkMobileNumber(req, res, next) {
  var loginUser = localStorage.getItem('adminLoginUserName');

  var mobilenumber = req.body.mobilenumber;
  var getCustomerData = customerModel.findOne({Mobilenumber: mobilenumber});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData) {

      return res.render('createprofile', {title: 'Front End Web Developer', msg: 'This Mobile Number is Already Registered with us', loginUser: loginUser});
    
    }     
    if(!customerData) {

      var getEmployeeData = employeesModel.findOne({Mobilenumber: mobilenumber});
      getEmployeeData.exec((err, employeeData) => {
        if(err) throw err;
        if(employeeData) {

        return res.render('createprofile', {title: 'Front End Web Developer', msg: 'This Mobile Number is Already Registered with us', loginUser: loginUser});
 
      }
      if(!employeeData) {

        var getAdminData = adminModule.findOne({Mobilenumber: mobilenumber});
        getAdminData.exec((err, adminData) => {
          if(err) throw err;
          if(adminData) {

            return res.render('createprofile', {title: 'Front End Web Developer', msg: 'This Mobile Number is Already Registered with us', loginUser: loginUser});
 
          }
          next();
        });
      }
      });

    }
    
  });
 }

 //Middleware Check Email Exactally Correct One
 function checkEmail(req, res, next) {
  var loginUser = localStorage.getItem('adminLoginUserName');

  var email = req.body.email;
  var getCustomerData = customerModel.findOne({Email: email});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData) {

      return res.render('createprofile', {title: 'Front End Web Developer', msg: 'This Email is Already Registered with us', loginUser: loginUser});
    
    }     
    if(!customerData) {

      var getEmployeeData = employeesModel.findOne({Email: email});
      getEmployeeData.exec((err, employeeData) => {
        if(err) throw err;
        if(employeeData) {

        return res.render('index', {title: 'Front End Web Developer', msg: 'This Email is Already Registered with us', loginUser: loginUser});
 
      }
      if(!employeeData) {

        var getAdminData = adminModule.findOne({Email: email});
        getAdminData.exec((err, adminData) => {
          if(err) throw err;
          if(adminData) {

            return res.render('index', {title: 'Front End Web Developer', msg: 'This Email is Already Registered with us', loginUser: loginUser});
 
          }
          next();
        });
      }
      });

    }
    
  });
 }

 //Send Sign Up Sending OTP Exactly Correct One
   router.post('/', checkUsername, checkMobileNumber, checkEmail,   function(req, res, next) {
    var loginUser = localStorage.getItem('adminLoginUserName');

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.usrname;
    var mobilenumber = req.body.mobilenumber;
    var email = req.body.email;  
  
    
    var Onetimepassword = crypto.randomBytes(16).toString('hex');
  
    var customerDetails = new customerModel({
      Firstname: firstname,
      Lastname: lastname,
      Username: username,
      Mobilenumber: mobilenumber,
      Email: email,    
     // Password: password,
      Onetimepassword: Onetimepassword
      });
  
      customerDetails.save((err )=> {
        if(err) throw err;
  //Send OTP Email
        var output = `
      <h3>Hi, Your One Time Password for Account Activation is ${Onetimepassword}</h3>
      <p>Please Enter the One Time Password in the opened link and press Activate Account</p>   
  `;
  var transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {    
      user: process.env.NODEMAILEMAILUSER,
      pass: process.env.NODEMAILEMAILPASSWORD    
    }
  });
  var mailOption = {
    from: 'resetpa7@gmail.com',
    to: email, //or use req.body.email
    subject: 'One Time Password (OTP) for Account Authentication',
    html: output
  };
  
  transporter.sendMail(mailOption, function(err, info) {
    if(err) {
      res.render('dashboardsignupcustomer', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: '', loginUser: loginUser}); 
    } else {
      res.render('dashboardsignupcustomer', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: '', loginUser: loginUser}); 
    }
  });      
      });     
    });

    //Customer Sign up sending OTP starts here Exactally Correct
    
  

// Sign up Account Activation for customer with OTP strts here
router.post('/dashboardaccountactivatedcustomer', function(req, res, next) {
  var loginUser = localStorage.getItem('adminLoginUserName');

  var oneTimePassword = req.body.otp;
  var password = req.body.password;
  var confirmPassword = req.body.cnfpassword;
  if(password != confirmPassword || password == '' || confirmPassword == '') {
    res.render('dashboardsignupcustomer', { title: 'frontendwebdeveloper', msg:'Password Not Matched, Please Try again', adminDetails: '', loginUser: loginUser});
  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    var getcustomerDetails = customerModel.findOne({Onetimepassword: oneTimePassword}, {});
    getcustomerDetails.exec((err, ExistingCustomerDetails)=> {
      if(err) throw err;
      if(ExistingCustomerDetails == null || ExistingCustomerDetails == '') {
        res.render('dashboardsignupcustomer', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Try again', adminDetails:'', loginUser: loginUser});

      } else {
        var getCustomerId = ExistingCustomerDetails._id;
        
        customerModel.findByIdAndUpdate(getCustomerId, {Onetimepassword: null, Password: password}, {upsert: true}, function(err, updatedCustomerDetails){
          if(err) throw err;           
          res.render('dashboardadmin', { title: 'frontendwebdeveloper', msg:'Account Activated Successfully, You may log in now', adminDetails: '', loginUser: loginUser, savedData: '', staffid: ''});
        })
      }      
    });        
  }  
});

// Sign up Account Activation for customer with OTP ends here

 
  

 
module.exports = router;
