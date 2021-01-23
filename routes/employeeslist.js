var express = require('express');
var router = express.Router();
var adminModule = require('../modules/adminschema');
var employeesModel = require('../modules/employeessignupschema');
/* GET home page. */

router.get('/',  function(req, res, next) {
        var loginUserAdmin = localStorage.getItem('adminLoginUserName');
    
    if(loginUserAdmin){
        
        var getEmployeesData = employeesModel.find({});
        getEmployeesData.exec((err, employeesData)=> {
            if(err) throw err;
            res.render('employeeslist', { title: 'Fronend Development', loginUser: loginUserAdmin, employeesData: employeesData });
        });
    } else {
        res.redirect('index');
    }
  });
  
  
module.exports = router;
