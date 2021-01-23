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
  var loginToken = localStorage.getItem('loginTokenName');
  var loginUser = localStorage.getItem('loginUserName');
  if(loginToken && loginUser){
    res.redirect('/dashboardemployees');
  } else {
    res.render('employees', { title: 'Front End Web Developer', msg:''});
  }  
});


//middleware
//Check LoginUser

function checkLoginUser(req, res, next) {
  var getLoginToken = localStorage.getItem('loginTokenName');
  try{
    var decoded = jwt.verify(getLoginToken, process.env.LOGIN_TOKEN_ACCESS_KEY);
  }catch(err) {
    res.redirect('/');
  }
  next();
}

//Require multer for file upload
var multer = require('multer');
//require path
var path = require('path');
router.use(express.static(path.join(__dirname, './public/')));
//Set Storage Engine for file to be stored
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});
//init upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('nationalidimage');
// Check file type
function checkFileType(file, cb) {
  // Allowed File extentions
  const fileTypes = /jpeg|jpg|png|gif/;
  //Check the Extentions
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if(mimetype && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

  /* GET home page. */
  router.get('/',  function(req, res, next) {
    var loginUser = {
      loginUserCustomer: localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {
      res.render('dashboardtemplates', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer });
    } else if(loginUser.loginUserEmployee){
      res.render('dashboardtemplates', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee });
    } else if(loginUser.loginUserAdmin) {
      res.render('dashboardtemplates', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin});
    } else {
      res.redirect('employees');
    }   
  });
  

  //Employees Sign up sending OTP starts here the most correct one
  router.post('/signupemployees', upload,   function(req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.usrname;
    var mobilenumber = req.body.mobilenumber;
    var email = req.body.email; 
    var nationalid = req.body.nationalid;
    var nationalidimage = req.file.filename;  
  
    var Onetimepassword = crypto.randomBytes(16).toString('hex');
  
    var empoyeeDetails = new employeesModel({
      Firstname: firstname,
      Lastname: lastname,
      Username: username,
      Mobilenumber: mobilenumber,
      Email: email,   
      Nationalid: nationalid,
      Imagename: nationalidimage,
      
      Onetimepassword: Onetimepassword
      });
  
      empoyeeDetails.save((err )=> {
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
      res.render('signupemployees', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
    } else {
      res.render('signupemployees', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
    }
  });      
      });     
    });
  //Admin Sign up sending OTP ends here the most correct one with image upload
  

  // Sign up Account Activation with OTP strts here
router.post('/accountactivatedemployees', function(req, res, next) {
  var oneTimePassword = req.body.otp;
  var password = req.body.password;
  var confirmPassword = req.body.cnfpassword;
  if(password != confirmPassword || password == '' || confirmPassword == '') {
    res.render('signupemployees', { title: 'frontendwebdeveloper', msg:'Password Not Matched, Please Try again', adminDetails: ''});
  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    var getEmployeesDetails = employeesModel.findOne({Onetimepassword: oneTimePassword}, {});
    getEmployeesDetails.exec((err, ExistingEmployeesDetails)=> {
      if(err) throw err;
      if(ExistingEmployeesDetails == null || ExistingEmployeesDetails == '') {
        res.render('signupemployees', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Try again', adminDetails:''});

      } else {
        var getEmployeeId = ExistingEmployeesDetails._id;
        
        employeesModel.findByIdAndUpdate(getEmployeeId, {Onetimepassword: null, Password: password}, {upsert: true}, function(err, updatedAdminDetails){
          if(err) throw err;           
          res.render('employees', { title: 'frontendwebdeveloper', msg:'Account Activated Successfully, You may log in now', adminDetails: ''});
        })
      }      
    });        
  }  
});
// Sign up Account Activation with OTP ends here

//jwt for creating a token
var jwt = require('jsonwebtoken');
// require local storage 
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}









module.exports = router;
