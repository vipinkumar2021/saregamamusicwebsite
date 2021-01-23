var express = require('express');
var router = express.Router();

var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');
var contactusModel = require('../modules/contactusschema');
var adminMembersTeamModel = require('../modules/adminmembersteamschema');
var outboxModel = require('../modules/outboxschema');
var cartItemsModel = require('../modules/cartitemsschema');
var uploadFileModel = require('../modules/uploadschema');
var recycleBinModel = require('../modules/recyclebinschema');
//jwt for creating a token
var jwt = require('jsonwebtoken');
const { findById, findOne } = require('../modules/contactusschema');
//const adminMembersTeamModel = require('../modules/adminmembersteamschema');
// require local storage 
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
//middleware
//Check LoginUser
/*
function checkLoginUser(req, res, next) {
  var getLoginToken = localStorage.getItem('customerLoginTokenName');
  try{
    var decoded = jwt.verify(getLoginToken, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY);
  }catch(err) {
    res.redirect('/');
  }
  next();
}
*/

/* GET home page. */ //Exactally Correct One
router.get('/deleteaccount/:id',  function(req, res, next) {
  var loginUser = {
    loginUserCustomer: localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
      customerModel.findOne({Username: loginUser.loginUserCustomer}).exec((err, customerAccoundData) => {
        if(err) throw err;
        if(customerAccoundData != null) {

            var saveToRecycleBin = new recycleBinModel({
                DeletedCustomerAccountDetails: customerAccoundData
            });
            saveToRecycleBin.save((err) => {
                if(err) throw err;      
           
    customerModel.findOneAndDelete({Username: loginUser.loginUserCustomer}).exec((err) => {
        if(err) throw err;        
        localStorage.removeItem('customerLoginTokenName');
        localStorage.removeItem('customerLoginUserName');
        res.redirect('index');
        //res.render('/index', { title: 'SaReGaMa Music Academy & GMP Studio', msg:'Customer Account Deleted Successfully', loginUser: '' /*loginUser.loginUserCustomer*/ });
         //res.render('dashboardcustomer', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer });
      });
      //
    });
}
});
//
     } else if(loginUser.loginUserEmployee){
    //res.redirect('dashboardemployees');
    employeesModel.findOne({Username: loginUser.loginUserEmployee}).exec((err, employeeAccountData) => {
        if(err) throw err;
        if(employeeAccountData != null) {
            var saveEmployeeAccountToRecycleBin = new recycleBinModel({
                DeletedEmployeeAccountDetails: employeeAccountData
            });
            saveEmployeeAccountToRecycleBin.save((err) => {
                if(err) throw err;
            
    employeesModel.findOneAndDelete({Username: loginUser.loginUserEmployee}).exec((err) => {
        if(err) throw err;
        localStorage.removeItem('employeeLoginTokenName');
        localStorage.removeItem('employeeLoginUserName');
        res.redirect('index');
    });

    //
});
}
});
    //
    //res.render('dashboardemployees', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee, savedData:'', staffdata: '', staffid: '' });
  } else if(loginUser.loginUserAdmin) {
      adminModule.findOne({Username: loginUser.loginUserAdmin}).exec((err, adminAccountData) => {
        if(err) throw err;
        if(adminAccountData != null) {
            var saveAdminAccountDetailsToRecycleBin = new recycleBinModel({
                DeletedAdminAccountDetails: adminAccountData
            });
            saveAdminAccountDetailsToRecycleBin.save((err) => {
                if(err) throw err;
            //
                adminMembersTeamModel.findOneAndDelete({Email: adminAccountData.Email }).exec((err) => {
                    if(err) throw err;

                
            //
      adminModule.findOneAndDelete({Username: loginUser.loginUserAdmin}).exec((err) => {
        if(err) throw err;
        localStorage.removeItem('adminLoginTokenName');
        localStorage.removeItem('adminLoginUserName');
        res.redirect('index');
      });

      //
    });
      //
//

    });
}
});
//
    /*var getSavedData = adminModule.findOne({Ussername: loginUser.loginUserAdmin});
      getSavedData.exec((err, savedData)=> { 

        if(err) throw err;
        
      res.render('dashboardadmin', { title: 'Frontend Webdeveloper', loginUser: loginUser.loginUserAdmin, staffdata: '', staffid: '', msg: '', file: '', uploadedImage: '', savedData: savedData });
     });
      */
     //  res.redirect('dashboardadmin');
   // res.render('dashboardtadmin', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin});
  } else {
    res.redirect('/');
  }   
});

//Delete msg javascript
router.get('/deleteinboxmsg/:id',  function(req, res, next) {
  var loginUserAdmin = localStorage.getItem('adminLoginUserName');

if(loginUserAdmin){
  
  var id = req.params.id
  //
  contactusModel.findOne({_id: id}).exec((err, inboxMsgData) => {
    if(err) throw err;
    if(inboxMsgData != null) {
      var saveInboxMsgToRecycleBin = new recycleBinModel({
        DeletedClientMessageDetails: inboxMsgData
      });
      saveInboxMsgToRecycleBin.save((err) => {
        if(err) throw err;
        
        //
  var findMsgAndDelete = contactusModel.findByIdAndDelete(id);
  findMsgAndDelete.exec((err) => {
if(err) throw err;
res.redirect('/');

  });
//
});
}
});
 // 

} else {
  res.redirect('admin');
}
});


//Delete msg javascript
router.get('/deleteoutboxmsg/:id',  function(req, res, next) {
  var loginUserAdmin = localStorage.getItem('adminLoginUserName');

if(loginUserAdmin){
  
  var id = req.params.id
//
  outboxModel.findOne({_id: id}).exec((err, outboxMsgData) => {
    if(err) throw err;
    if(outboxMsgData != null) {
      var saveOutboxMsgToRecycleBin = new recycleBinModel({
        DeletedOutboxMessageDetails: outboxMsgData
      });
      saveOutboxMsgToRecycleBin.save((err) => {
        if(err) throw err;

      //
  var findOutboxMsgAndDelete = outboxModel.findByIdAndDelete(id);
  findOutboxMsgAndDelete.exec((err) => {
if(err) throw err;
res.redirect('/');

  });
  
  //
});
}
});

//

} else {
  res.redirect('admin');
}
});




module.exports = router;
