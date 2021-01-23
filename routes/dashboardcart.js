var express = require('express');
var router = express.Router();

var cartItemsModel = require('../modules/cartitemsschema');

/* GET home page. */
router.get('/',  function(req, res, next) {
  var loginUser = {
    loginUserCustomer: localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: localStorage.getItem('adminLoginUserName')

  };

  var getCurrentAccountUserName = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
  
  cartItemsModel.findOne({Username: getCurrentAccountUserName}).exec((err, currentAccountUserData) => {
    if(err) throw err;

    if(currentAccountUserData == null ) {
      if(loginUser.loginUserCustomer) {
        res.render('dashboardcart', { title: 'Front End Web Developer', msg:'No Item in the cart', loginUser: loginUser.loginUserCustomer, currentAccountUserData: currentAccountUserData });
      } else if(loginUser.loginUserEmployee){
        res.render('dashboardcart', { title: 'Front End Web Developer', msg:'No Item in the cart', loginUser: loginUser.loginUserEmployee, currentAccountUserData: currentAccountUserData });
      } else if(loginUser.loginUserAdmin) {
        res.render('dashboardcart', { title: 'Front End Web Developer', msg:'No Item in the cart', loginUser: loginUser.loginUserAdmin, currentAccountUserData: currentAccountUserData});
      } else {
        res.redirect('index');
      }   
    } else {
      if(loginUser.loginUserCustomer) {
        res.render('dashboardcart', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserCustomer, currentAccountUserData: currentAccountUserData });
      } else if(loginUser.loginUserEmployee){
        res.render('dashboardcart', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserEmployee, currentAccountUserData: currentAccountUserData });
      } else if(loginUser.loginUserAdmin) {
        res.render('dashboardcart', { title: 'Front End Web Developer', msg:'', loginUser: loginUser.loginUserAdmin, currentAccountUserData: currentAccountUserData});
      } else {
        res.redirect('index');
      }   
    }
    
  });  
});



module.exports = router;
