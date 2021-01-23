var express = require('express');
var router = express.Router();

var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/customersignupschema');

//var getadminDetails =  adminModule.find({}, {"Email":1,"Firstname":1, _id: 0});
///var getadminDetails =  adminModule.find({}, { _id: 1});
//var getadminDetails =  adminModule.find({}, {'Email':1,'Onetimepassword':1, _id: 1});

//var getadminDetails =  adminModule.findById("5f71958f086581101c76abc2", {'Email':1,'Onetimepassword':1, _id: 1});
//var getadminDetails =  adminModule.findOne({}, {'Firstname':1,'Onetimepassword':1, _id: 1});
//var getadminDetails =  adminModule.findOne({}, {'Onetimepassword':1, _id: 1});
//var getadminDetails =  adminModule.findById("5f71c66762a7735918f83856",{}, { _id: 1});
//var getadminDetails =  adminModule.findOne({}, {});

//var getadminDetails =  adminModule.findOne({'Email':'vipinkmboj17@gmail.com'}, {});

/* GET home page. */
/* GET home page. */
router.get('/', function(req, res, next) {
    var loginUser = localStorage.getItem('loginUserName');

    var oneTimePassword = 'abcdef';
    var username = 'ravikumarr'
    //var getadminDetails = adminModule.findOne({'Onetimepassword': oneTimePassword}, {});
    //var getadminDetails = adminModule.findOne({'Onetimepassword': oneTimePassword}, {});
    //var getadminDetails = adminModule.findOne({Username: loginUser}, /*{Email: 'vipinkmboj@gmail.com'}*/);
    //var getadminDetails = customerModel.findOne({Username: 'ravikumar'}, {Username: 'ravikumar', Email: 'resetpa7@gmail.com'} /*{Email: 'vipinkmboj@gmail.com'}*/);
    //var getadminDetails = adminModule.findOne({Username: username}, {Username: username} /*{Email: 'vipinkmboj@gmail.com'}*/);

    var getadminDetails = adminModule.findOne({});

    getadminDetails.exec(function(err, existingAdminDetails) {
        if(err) throw err;
        if(existingAdminDetails) {

          return  res.send(`User Details are as follows <br/> ${existingAdminDetails}` );
        } else {
            customerModel.findOne({Username: username}, {Username: username}).exec((err, existingCustomerDetails) => {
                if(err) throw err;
                if(existingCustomerDetails) {
                    return  res.send(`User Details are as follows <br/> ${existingCustomerDetails}` );
                }
                else {
                    return  res.send(`User Details are as follows <br/> No Data Found` );
                }
              });
            
            }
        //var getUsername = existingAdminDetails.Username;
       // res.send('OTP Not Matched');
    
        //if(err) throw new Error('something bad happened');
        //if(err) callback(new Error(res.send('OTP Not Matched')))
            
        
       
        //if(ersistingAdminDetails)
         
        
        /*if(err) {
            res.send('OTP Not Matched');
        } else {
*/
            /*
        var getadminDetails = {
            firstname: existingAdminDetails.Firstname,
            lastname: existingAdminDetails.Lastname
        }
        
        */
           // res.send(`User Details are as follows <br/> ${existingAdminDetails}` );
     //   }

        
    }); 
});

module.exports = router;
