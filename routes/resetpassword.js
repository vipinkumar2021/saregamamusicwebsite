var express = require('express');
var router = express.Router();
//Require bcrypt to encrypt password
var bcrypt = require('bcryptjs');
var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');

// require dot env
require('dotenv').config();
//encrypt passwords using bcrypt
var bcrypt = require('bcryptjs');
//Crypto for creating randombytes key
var crypto = require('crypto');
//nodemailer for sending emails from website to clients
var nodemailer = require('nodemailer');
const e = require('express');


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
    res.render('resetpassword', { title: 'Front End Web Developer', msg:''});
  }  
});

  
// Send OTP Email from Forgot Password to Registered email id starts here
/*
router.post('/', function(req, res, next) {
  var messageto = req.body.email;
  var checkRegisteredEmailInCustomerDetails= customerModel.findOne({Email: messageto});
  var checkRegisteredEmailInEmployeesDetails= employeesModel.findOne({Email: messageto});
  var checkRegisteredEmailInAdminDetails= adminModule.findOne({Email: messageto});
 
  if(checkRegisteredEmailInCustomerDetails) {
    checkRegisteredEmailInCustomerDetails.exec((err, data) => {
      if(err) throw err;
      if(data == null) {
        return checkRegisteredEmailInEmployeesDetails;
      } else {
        var createdOTPForCustomerAccount = crypto.randomBytes(16).toString('hex');
        var getCustomerAccountId = data._id; 
        customerModel.findByIdAndUpdate(getCustomerAccountId, {Onetimepassword: createdOTPForCustomerAccount}, function(err) {
          if(err) throw err;


          var output = `
    <h3>Contact Details</h3>
    <ul>
      <li>Company: Freelanceforall.com/demo account</li>
      <li>Email: companyemail@email.com....demo for now</li>
      <li>Toll Free: 00800 ...demo for now...</li>    
    </ul>
      <h3>Message</h3>
      <p>Your One Time Password (OTP) for Password Reset is</p>
      <p>${createdOTPForCustomerAccount}</p> 
      <p>Please copy this OTP and follow the instructions</p> 
    `;  
  
    //Nodemailer strts here...
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      
      user: process.env.NODEMAILEMAILUSER,
      pass: process.env.NODEMAILEMAILPASSWORD
      
    }
  });
  
  var mailOption = {
    from: 'resetpa7@gmail.com',
    to: messageto ,
    subject: 'You got a new msg from Vipin',
    html: output
  };
  transporter.sendMail(mailOption, function(err, info) {
    if(err) throw err;
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
  });   

        });
      } 

    });
  } else if(checkRegisteredEmailInEmployeesDetails) {
    checkRegisteredEmailInEmployeesDetails.exec((err, data1) => {
      if(err) throw err;
      if(data1 == null) {
        return checkRegisteredEmailInAdminDetails;
      } else {

        var createdOTPForEmployeeAccount = crypto.randomBytes(16).toString('hex');
        var getEmployeeAccountId = data1._id; 
        employeesModel.findByIdAndUpdate(getEmployeeAccountId, {Onetimepassword: createdOTPForEmployeeAccount}, function(err) {
          if(err) throw err;

          var output = `
    <h3>Contact Details</h3>
    <ul>
      <li>Company: Freelanceforall.com/demo account</li>
      <li>Email: companyemail@email.com....demo for now</li>
      <li>Toll Free: 00800 ...demo for now...</li>    
    </ul>
      <h3>Message</h3>
      <p>Your One Time Password (OTP) for Password Reset is</p>
      <p>${createdOTPForEmployeeAccount}</p> 
      <p>Please copy this OTP and follow the instructions</p> 
    `;  
  
    //Nodemailer strts here...
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      
      user: process.env.NODEMAILEMAILUSER,
      pass: process.env.NODEMAILEMAILPASSWORD
      
    }
  });
  
  var mailOption = {
    from: 'resetpa7@gmail.com',
    to: messageto ,
    subject: 'You got a new msg from Vipin',
    html: output
  };
  transporter.sendMail(mailOption, function(err, info) {
    if(err) throw err;
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
  });   

        });


      }
      

    });
  } else {
    checkRegisteredEmailInAdminDetails.exec((err, data2) => {
      if(err) throw err;
      if(data2 == null) {
        res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Wrong Email Entered, Please Enter your registered Email Address' });
      } else {


        var createdOTPForAdminAccount = crypto.randomBytes(16).toString('hex');
        var getCustomerAdminId = data._id; 
        adminModule.findByIdAndUpdate(getCustomerAdminId, {Onetimepassword: createdOTPForAdminAccount}, function(err) {
          if(err) throw err;

          var output = `
    <h3>Contact Details</h3>
    <ul>
      <li>Company: Freelanceforall.com/demo account</li>
      <li>Email: companyemail@email.com....demo for now</li>
      <li>Toll Free: 00800 ...demo for now...</li>    
    </ul>
      <h3>Message</h3>
      <p>Your One Time Password (OTP) for Password Reset is</p>
      <p>${createdOTPForAdminAccount}</p> 
      <p>Please copy this OTP and follow the instructions</p> 
    `;  
  
    //Nodemailer strts here...
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      
      user: process.env.NODEMAILEMAILUSER,
      pass: process.env.NODEMAILEMAILPASSWORD
      
    }
  });
  
  var mailOption = {
    from: 'resetpa7@gmail.com',
    to: messageto ,
    subject: 'You got a new msg from Vipin',
    html: output
  };
  transporter.sendMail(mailOption, function(err, info) {
    if(err) throw err;
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
  }); 
        });

      }
    });
  }
});
/*
router.post('/', function(req, res, next) {

  var messageto = req.body.email;
  var checkRegisteredEmailInCustomerDetails= customerModel.findOne({Email: messageto});
  var checkRegisteredEmailInEmployeesDetails= employeesModel.findOne({Email: messageto});
  var checkRegisteredEmailInAdminDetails= adminModule.findOne({Email: messageto});

/*var checkRegisteredEmail = {
  checkRegisteredEmailInCustomerDetails: customerModel.findOne({Email: messageto}),
  checkRegisteredEmailInEmployeesDetails: employeesModel.findOne({Email: messageto}),
  checkRegisteredEmailInAdminDetails: adminModule.findOne({Email: messageto})

}*/
/*
switch(checkRegisteredEmailInCustomerDetails | checkRegisteredEmailInEmployeesDetails | checkRegisteredEmailInAdminDetails) {
  case checkRegisteredEmailInCustomerDetails:
  checkRegisteredEmailInCustomerDetails.exec((err, data) => {
    if(err) throw err;
    var otpForCustomerAccount =  crypto.randomBytes(16).toString('hex');
    var getCustomerAccountId = data._id;    

    customerModel.findByIdAndUpdate(getCustomerAccountId, {Onetimepassword: otpForCustomerAccount}, function(err) {
      if(err) throw err;
      var output = `
    <h3>Contact Details</h3>
    <ul>
      <li>Company: Freelanceforall.com/demo account</li>
      <li>Email: companyemail@email.com....demo for now</li>
      <li>Toll Free: 00800 ...demo for now...</li>    
    </ul>
      <h3>Message</h3>
      <p>Your One Time Password (OTP) for Password Reset is</p>
      <p>${otpForCustomerAccount}</p> 
      <p>Please copy this OTP and follow the instructions</p> 
    `;  
  
    //Nodemailer strts here...
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      
      user: process.env.NODEMAILEMAILUSER,
      pass: process.env.NODEMAILEMAILPASSWORD
      
    }
  });
  
  var mailOption = {
    from: 'resetpa7@gmail.com',
    to: messageto ,
    subject: 'You got a new msg from Vipin',
    html: output
  };
  transporter.sendMail(mailOption, function(err, info) {
    if(err) throw err;
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
  });   
    });
  });
    break;
  case checkRegisteredEmailInEmployeesDetails:
    checkRegisteredEmailInEmployeesDetails.exec((err, data1) => {
      if(err) throw err;
      var otpForEmployeeAccount =  crypto.randomBytes(16).toString('hex');
      var getEmployeeAccountId = data1._id;
  
      employeesModel.findByIdAndUpdate(getEmployeeAccountId, {Onetimepassword: otpForEmployeeAccount}, function(err) {
        if(err) throw err;
        var output = `
      <h3>Contact Details</h3>
      <ul>
        <li>Company: Freelanceforall.com/demo account</li>
        <li>Email: companyemail@email.com....demo for now</li>
        <li>Toll Free: 00800 ...demo for now...</li>    
      </ul>
        <h3>Message</h3>
        <p>Your One Time Password (OTP) for Password Reset is</p>
        <p>${otpForEmployeeAccount}</p> 
        <p>Please copy this OTP and follow the instructions</p> 
      `;  
    
      //Nodemailer strts here...
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        
        user: process.env.NODEMAILEMAILUSER,
        pass: process.env.NODEMAILEMAILPASSWORD
        
      }
    });
    
    var mailOption = {
      from: 'resetpa7@gmail.com',
      to: messageto ,
      subject: 'You got a new msg from Vipin',
      html: output
    };
    transporter.sendMail(mailOption, function(err, info) {
      if(err) throw err;
      res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
    });   
      });
    });
    break;
    case checkRegisteredEmailInAdminDetails:
      checkRegisteredEmailInAdminDetails.exec((err, data2) => {
        if(err) throw err;
        var otpForAdminAccount =  crypto.randomBytes(16).toString('hex');
        var getAdminAccountId = data._id;
    
        customerModel.findByIdAndUpdate(getAdminAccountId, {Onetimepassword: otpForAdminAccount}, function(err) {
          if(err) throw err;
          var output = `
        <h3>Contact Details</h3>
        <ul>
          <li>Company: Freelanceforall.com/demo account</li>
          <li>Email: companyemail@email.com....demo for now</li>
          <li>Toll Free: 00800 ...demo for now...</li>    
        </ul>
          <h3>Message</h3>
          <p>Your One Time Password (OTP) for Password Reset is</p>
          <p>${otpForAdminAccount}</p> 
          <p>Please copy this OTP and follow the instructions</p> 
        `;  
      
        //Nodemailer strts here...
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          
          user: process.env.NODEMAILEMAILUSER,
          pass: process.env.NODEMAILEMAILPASSWORD
          
        }
      });
      
      var mailOption = {
        from: 'resetpa7@gmail.com',
        to: messageto ,
        subject: 'You got a new msg from Vipin',
        html: output
      };
      transporter.sendMail(mailOption, function(err, info) {
        if(err) throw err;
        res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
      });   
        });
      });
     break; 
    default:
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Wrong Email Id Entered' });
    
}

});
*/
// Send OTP Email from Forgot Password to Registered email id starts here

router.post('/', function(req, res, next) {
    var messageto = req.body.email; 
    var checkRegisteredEmailInCustomerDetails = customerModel.findOne({Email: messageto});
    var checkRegisteredEmailInEmployeesDetails = employeesModel.findOne({Email: messageto});
    var checkRegisteredEmailInAdminDetails = adminModule.findOne({Email: messageto});

    checkRegisteredEmailInCustomerDetails.exec((err, dataWithRegisteredEmail ) => {
      if(err) throw err;

      if(dataWithRegisteredEmail != null) {
        var otpForCustomerAccount =  crypto.randomBytes(16).toString('hex');
        var getCustomerAccountId = dataWithRegisteredEmail._id;
        
        customerModel.findByIdAndUpdate(getCustomerAccountId, {Onetimepassword: otpForCustomerAccount}, function(err) {
          if(err) throw err;
          var output = `
    <h3>Contact Details</h3>
    <ul>
      <li>Company: Freelanceforall.com/demo account</li>
      <li>Email: companyemail@email.com....demo for now</li>
      <li>Toll Free: 00800 ...demo for now...</li>    
    </ul>
      <h3>Message</h3>
      <p>Your One Time Password (OTP) for Password Reset is</p>
      <p>${otpForCustomerAccount}</p> 
      <p>Please copy this OTP and follow the instructions</p> 
    `;  
  
    //Nodemailer strts here...
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      
      user: process.env.NODEMAILEMAILUSER,
      pass: process.env.NODEMAILEMAILPASSWORD
      
    }
  });
  
  var mailOption = {
    from: 'resetpa7@gmail.com',
    to: messageto ,
    subject: 'You got a new msg from Vipin',
    html: output
  };
  transporter.sendMail(mailOption, function(err, info) {
    if(err) throw err;
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
  });     
        
        });
      } else if(dataWithRegisteredEmail == null){
        checkRegisteredEmailInEmployeesDetails.exec((err, dataWithRegisteredEmail1) => {
          if(err) throw err;         
            if(dataWithRegisteredEmail1 != null) {
              var otpForEmployeeAccount =  crypto.randomBytes(16).toString('hex');
              var getEmployeeAccountId = dataWithRegisteredEmail1._id;
              employeesModel.findByIdAndUpdate(getEmployeeAccountId, {Onetimepassword: otpForEmployeeAccount}, function(err) {
                if(err) throw err;
                var output = `
          <h3>Contact Details</h3>
          <ul>
            <li>Company: Freelanceforall.com/demo account</li>
            <li>Email: companyemail@email.com....demo for now</li>
            <li>Toll Free: 00800 ...demo for now...</li>    
          </ul>
            <h3>Message</h3>
            <p>Your One Time Password (OTP) for Password Reset is</p>
            <p>${otpForEmployeeAccount}</p> 
            <p>Please copy this OTP and follow the instructions</p> 
          `;  
        
          //Nodemailer strts here...
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            
            user: process.env.NODEMAILEMAILUSER,
            pass: process.env.NODEMAILEMAILPASSWORD
            
          }
        });
        
        var mailOption = {
          from: 'resetpa7@gmail.com',
          to: messageto ,
          subject: 'You got a new msg from Vipin',
          html: output
        };
        transporter.sendMail(mailOption, function(err, info) {
          if(err) throw err;
          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
        });    
  
      });  
            } else if(dataWithRegisteredEmail1 == null) {
              checkRegisteredEmailInAdminDetails.exec((err, dataWithRegisteredEmail2) => {
                if(err) throw err;

                if(dataWithRegisteredEmail2 != null) {

                  var otpForAdminAccount =  crypto.randomBytes(16).toString('hex');
                  var getAdminAccountId = dataWithRegisteredEmail2._id;

                  adminModule.findByIdAndUpdate(getAdminAccountId, {Onetimepassword: otpForAdminAccount}, function(err) {
                    if(err) throw err;
            var output = `
      <h3>Contact Details</h3>
      <ul>
        <li>Company: Freelanceforall.com/demo account</li>
        <li>Email: companyemail@email.com....demo for now</li>
        <li>Toll Free: 00800 ...demo for now...</li>    
      </ul>
        <h3>Message</h3>
        <p>Your One Time Password (OTP) for Password Reset is</p>
        <p>${otpForAdminAccount}</p> 
        <p>Please copy this OTP and follow the instructions</p> 
      `;  
    
      //Nodemailer strts here...
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        
        user: process.env.NODEMAILEMAILUSER,
        pass: process.env.NODEMAILEMAILPASSWORD
        
      }
    });
    
    var mailOption = {
      from: 'resetpa7@gmail.com',
      to: messageto ,
      subject: 'You got a new msg from Vipin',
      html: output
    };
    transporter.sendMail(mailOption, function(err, info) {
      if(err) throw err;
      res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email' });
    });  
                  });

                } else {
                  res.render('forgotpassword', { title: 'frontendwebdeveloper', msg:'Wrong Email Entered, Please Enter Registered Email Id' });
                }  
              });
            }              
        });
      } 
    });    
  });
  
  // Send OTP Email from Forgot Password to Registered email id starts here
  

// Confirm OTP and reset/update password strts here Exactly Correct
/*
router.post('/updatepassword', function(req, res, next) {
  var otpResetPassword = req.body.otpresetpassword;
  var newPassword = req.body.newpassword;
  var confirmNewPassword = req.body.cnfnewpassword;

  if(newPassword != confirmNewPassword || newPassword == '' || confirmNewPassword == '') {
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Passwords Not Matched, Please Enter Correct Password' });
  } else {
    newPassword = bcrypt.hashSync(req.body.newpassword, 10);

    var compareOtpEnteredWithRegisteredOtpInCustomerData = customerModel.findOne({Onetimepassword: otpResetPassword});
    var compareOtpEnteredWithRegisteredOtpInEmployeesData = employeesModel.findOne({Onetimepassword: otpResetPassword});
    var compareOtpEnteredWithRegisteredOtpInAdminData = adminModule.findOne({Onetimepassword: otpResetPassword});

    compareOtpEnteredWithRegisteredOtpInCustomerData.exec((err, customerData) => {
      if(err) throw err;
      if(customerData != null) {
        var getCustomerId = customerData._id;
        customerModel.findByIdAndUpdate(getCustomerId, {Onetimepassword: null, Password: newPassword}, function(err) {
          if(err) throw err;

          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });
        });
      } else if(customerData == null) {
        compareOtpEnteredWithRegisteredOtpInEmployeesData.exec((err, employeeData) => {
          if(err) throw err;
          if(employeeData != null) {
            var getEmployeeId = employeeData._id;
            employeesModel.findByIdAndUpdate(getEmployeeId, {Onetimepassword: null, Password: newPassword}, function(err) {
              if(err) throw err;
              res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

            });
          } else if(employeeData == null) {
            compareOtpEnteredWithRegisteredOtpInAdminData.exec((err, adminData) => {
              if(err) throw err;
              if(adminData != null) {
                var getAdminId = adminData._id;
                adminModule.findByIdAndUpdate(getAdminId, {Onetimepassword: null, Password: newPassword}, function(err) {
                  if(err) throw err;
                  res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

                });
              } else {
                res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Enter the OTP sent to your Registered Email.' });

              }
            });
          }
        });
      }


    });

  }
});
// Confirm OTP and reset/update password ends here Exactly Correct
*/
router.post('/updatepassword', function(req, res, next) {
  var otpResetPassword = req.body.otpresetpassword;
  var newPassword = req.body.newpassword;
  var confirmNewPassword = req.body.cnfnewpassword;

  if(newPassword != confirmNewPassword || newPassword == '' || confirmNewPassword == '') {
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Passwords Not Matched, Please Enter Correct Password' });
  } else {
    newPassword = bcrypt.hashSync(req.body.newpassword, 10);

    var compareOtpEnteredWithRegisteredOtpInCustomerData = customerModel.findOne({Onetimepassword: otpResetPassword});
    var compareOtpEnteredWithRegisteredOtpInEmployeesData = employeesModel.findOne({Onetimepassword: otpResetPassword});
    var compareOtpEnteredWithRegisteredOtpInAdminData = adminModule.findOne({Onetimepassword: otpResetPassword});

    compareOtpEnteredWithRegisteredOtpInCustomerData.exec((err, customerData) => {
      if(err) throw err;
      if(customerData != null) {
        var getCustomerId = customerData._id;
        customerModel.findByIdAndUpdate(getCustomerId, {Onetimepassword: null, Password: newPassword}, function(err) {
          if(err) throw err;
          //Send msg to registered email
          var messageto = customerData.Email;
          var output = `
          <h3>Contact Details</h3>
          <ul>
            <li>Company: Freelanceforall.com/demo account</li>
            <li>Email: companyemail@email.com....demo for now</li>
            <li>Toll Free: 00800 ...demo for now...</li>    
          </ul>
            <h3>Message</h3>
            <p>Your Password has been reset successfully</p>
            <p>If Not You, Please Reset Your Password immediately or call Toll Free: ......</p> 
            
          `;         
          
          //Nodemailer strts here...
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            
            user: process.env.NODEMAILEMAILUSER,
            pass: process.env.NODEMAILEMAILPASSWORD
            
          }
        });
        
        var mailOption = {
          from: 'resetpa7@gmail.com',
          to: messageto ,
          subject: 'You got a new msg from Vipin',
          html: output
        };

        transporter.sendMail(mailOption, function(err, info) {
          if(err) throw err;
          // Show msg in website that password is reset
          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

        });
                  });
      } else if(customerData == null) {
        compareOtpEnteredWithRegisteredOtpInEmployeesData.exec((err, employeeData) => {
          if(err) throw err;
          if(employeeData != null) {
            var getEmployeeId = employeeData._id;
            employeesModel.findByIdAndUpdate(getEmployeeId, {Onetimepassword: null, Password: newPassword}, function(err) {
              if(err) throw err;
              //Send msg to registered email
          var messageto = employeeData.Email;
          var output = `
          <h3>Contact Details</h3>
          <ul>
            <li>Company: Freelanceforall.com/demo account</li>
            <li>Email: companyemail@email.com....demo for now</li>
            <li>Toll Free: 00800 ...demo for now...</li>    
          </ul>
            <h3>Message</h3>
            <p>Your Password has been reset successfully</p>
            <p>If Not You, Please Reset Your Password immediately or call Toll Free: ......</p> 
            
          `;         
          
          //Nodemailer strts here...
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            
            user: process.env.NODEMAILEMAILUSER,
            pass: process.env.NODEMAILEMAILPASSWORD
            
          }
        });
        
        var mailOption = {
          from: 'resetpa7@gmail.com',
          to: messageto ,
          subject: 'You got a new msg from Vipin',
          html: output
        };

        transporter.sendMail(mailOption, function(err, info) {
          if(err) throw err;
          // Show msg in website that password is reset
          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

        });
          
            });
          } else if(employeeData == null) {
            compareOtpEnteredWithRegisteredOtpInAdminData.exec((err, adminData) => {
              if(err) throw err;
              if(adminData != null) {
                var getAdminId = adminData._id;
                adminModule.findByIdAndUpdate(getAdminId, {Onetimepassword: null, Password: newPassword}, function(err) {
                  if(err) throw err;
                  //Send msg to registered email
          var messageto = adminData.Email;
          var output = `
          <h3>Contact Details</h3>
          <ul>
            <li>Company: Freelanceforall.com/demo account</li>
            <li>Email: companyemail@email.com....demo for now</li>
            <li>Toll Free: 00800 ...demo for now...</li>    
          </ul>
            <h3>Message</h3>
            <p>Your Password has been reset successfully</p>
            <p>If Not You, Please Reset Your Password immediately or call Toll Free: ......</p> 
            
          `;         
          
          //Nodemailer strts here...
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            
            user: process.env.NODEMAILEMAILUSER,
            pass: process.env.NODEMAILEMAILPASSWORD
            
          }
        });
        
        var mailOption = {
          from: 'resetpa7@gmail.com',
          to: messageto ,
          subject: 'You got a new msg from Vipin',
          html: output
        };

        transporter.sendMail(mailOption, function(err, info) {
          if(err) throw err;
          // Show msg in website that password is reset
          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

        });                  
                });
              } else {
                res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Enter the OTP sent to your Registered Email.' });

              }
            });
          }
        });
      }


    });

  }
});

   module.exports = router;
