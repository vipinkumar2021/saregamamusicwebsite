var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Requiring bodyparser Vipin
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var contactusRouter = require('./routes/contactus');
var usersRouter = require('./routes/users');
//var templatesRouter = require('./routes/templates');
/*var foodandrestaurantsRouter = require('./routes/foodandrestaurants');
var dashboardfoodandrestaurantsRouter = require('./routes/dashboardfoodandrestaurants');
var portfolioRouter = require('./routes/portfolio');
var dashboardportfolioRouter = require('./routes/dashboardportfolio');
var smallbusinessRouter = require('./routes/smallbusiness');
var dashboardsmallbusinessRouter = require('./routes/dashboardsmallbusiness');
var blogRouter = require('./routes/blog');
var dashboardblogRouter = require('./routes/dashboardblog');
var vlogRouter = require('./routes/vlog');
var dashboardvlogRouter = require('./routes/dashboardvlog');
var marketingRouter = require('./routes/marketing');
var dashboardmarketingRouter = require('./routes/dashboardmarketing');
var weddinginvitationRouter = require('./routes/weddinginvitation');
var dashboardweddinginvitationRouter = require('./routes/dashboardweddinginvitation');
var webpageRouter = require('./routes/webpage');
var dashboardwebpageRouter = require('./routes/dashboardwebpage');
var comingsoonRouter = require('./routes/comingsoon');
var dashboardcomingsoonRouter = require('./routes/dashboardcomingsoon');
var phototemplatesRouter = require('./routes/phototemplates');
var dashboardphototemplatesRouter = require('./routes/dashboardphototemplates');
var startpagetemplatesRouter = require('./routes/startpagetemplates');
var dashboardstartpagetemplatesRouter = require('./routes/dashboardstartpagetemplates');
var othertemplatesRouter = require('./routes/othertemplates');
var dashboardothertemplatesRouter = require('./routes/dashboardothertemplates');
*/
var adminRouter = require('./routes/admin');
var dashboardadminRouter = require('./routes/dashboardadmin');
var dashboardwebsiteRouter = require('./routes/dashboardwebsite');
var dashboardcustomerRouter = require('./routes/dashboardcustomer');

//var dashboardtemplatesRouter = require('./routes/dashboardtemplates');
//var signupRouter = require('./routes/signup');
var signoutRouter = require('./routes/signout');
var forgotusernameRouter = require('./routes/forgotusername');
var getusernameRouter = require('./routes/getusername');
var forgotpasswordRouter = require('./routes/forgotpassword');
var resetpasswordRouter = require('./routes/resetpassword');
var galleryRouter = require('./routes/gallery');
var adminstafflistRouter = require('./routes/adminstafflist');
var employeeslistRouter = require('./routes/employeeslist');
var clientslistRouter = require('./routes/clientslist');
//var careerRouter = require('./routes/career');
//var dashboardcareerRouter = require('./routes/dashboardcareer');
var accountactivatedRouter = require('./routes/accountactivated');


/*var employeesRouter = require('./routes/employees');
var dashboardemployeesRouter = require('./routes/dashboardemployees');*/

/*
var getstartedRouter = require('./routes/getstarted');
var dashboardgetstartedRouter = require('./routes/dashboardgetstarted');
*/
var dashboardcartRouter = require('./routes/dashboardcart');
var inboxRouter = require('./routes/inbox');
var outboxRouter = require('./routes/outbox');
var createprofileRouter = require('./routes/createprofile');
var editprofileRouter = require('./routes/editprofile');
//var deleteprofileRouter = require('./routes/deleteprofile');
var deleteRouter = require('./routes/delete');
var uploadfileRouter = require('./routes/uploadfile');
var recyclebinRouter = require('./routes/recyclebin');
var giveaccessRouter = require('./routes/giveaccess');
var dashboardgalleryRouter = require('./routes/dashboardgallery');

//food and restaurant templates demo
/*var pizzarestaurantdemoRouter = require('./routes/pizzarestaurantdemo');
var cateringtemplatedemoRouter = require('./routes/cateringtemplatedemo');
var modalrestauranttemplatedemoRouter = require('./routes/modalrestauranttemplatedemo');
var cafetemplatedemoRouter = require('./routes/cafetemplatedemo');
*/
//portfolio templates demo
/*
var portfoliotemplatedemoRouter = require('./routes/portfoliotemplatedemo');
var cvresumetemplatedemoRouter = require('./routes/cvresumetemplatedemo');
var photoportfoliotemplatedemoRouter = require('./routes/photoportfoliotemplatedemo');
var natureportfoliotemplatedemoRouter = require('./routes/natureportfoliotemplatedemo');
var peopleportfoliotemplatedemoRouter = require('./routes/peopleportfoliotemplatedemo');
var peopleportfoliotemplatetwodemoRouter = require('./routes/peopleportfoliotemplatetwodemo');
var darkportfoliotemplatedemoRouter = require('./routes/darkportfoliotemplatedemo');
var blackandwhiteportfoliotemplatedemoRouter = require('./routes/blackandwhiteportfoliotemplatedemo');
var clothingstoretemplatedemoRouter = require('./routes/clothingstoretemplatedemo');
var interiordesigntemplatedemoRouter = require('./routes/interiordesigntemplatedemo');
var blogtemplatedemoRouter = require('./routes/blogtemplatedemo');
var foodblogtemplatedemoRouter = require('./routes/foodblogtemplatedemo');
var fashionblogtemplatedemoRouter = require('./routes/fashionblogtemplatedemo');
var cafeblogtemplatedemoRouter = require('./routes/cafeblogtemplatedemo');
var vlogtemplatedemoRouter = require('./routes/vlogtemplatedemo');
var marketingwebsitetemplatedemoRouter = require('./routes/marketingwebsitetemplatedemo');
var weddinginvitationtemplatedemoRouter = require('./routes/weddinginvitationtemplatedemo');
var webpagetemplatedemoRouter = require('./routes/webpagetemplatedemo');
var comingsoontemplatedemoRouter = require('./routes/comingsoontemplatedemo');
var phototemplatedemoRouter = require('./routes/phototemplatedemo');
var blackandwhitephototemplatedemoRouter = require('./routes/blackandwhitephototemplatedemo');
var startpagetemplatedemoRouter = require('./routes/startpagetemplatedemo');
var startuptemplatedemoRouter = require('./routes/startuptemplatedemo');
var socialmediatemplatedemoRouter = require('./routes/socialmediatemplatedemo');
var hoteltemplatedemoRouter = require('./routes/hoteltemplatedemo');
var bandtemplatedemoRouter = require('./routes/bandtemplatedemo');
var mailtemplatedemoRouter = require('./routes/mailtemplatedemo');
var freelancerslistRouter = require('./routes/freelancerslist');
var dashboardfreelancerslistRouter = require('./routes/dashboardfreelancerslist');
var alladvertisementsRouter = require('./routes/alladvertisements');
*/

var servicesRouter = require('./routes/services');
var dashboardservicesRouter = require('./routes/dashboardservices');
var musicproductionRouter = require('./routes/musicproduction');
var vocalclassesRouter = require('./routes/vocalclasses');
var guitarclassesRouter = require('./routes/guitarclasses');
var tablaclassesRouter = require('./routes/tablaclasses');
var pianoclassesRouter = require('./routes/pianoclasses');
var harmoniumclassesRouter = require('./routes/harmoniumclasses');
var bookliveconcertRouter = require('./routes/bookliveconcert');
var audiorecordyoursongRouter = require('./routes/audiorecordyoursong');
var videoshootyoursongRouter = require('./routes/videoshootyoursong');
var musicclassesRouter = require('./routes/musicclasses');
var dashboardmusicclassesRouter = require('./routes/dashboardmusicclasses');
var dashboardmusicproductionRouter = require('./routes/dashboardmusicproduction');
var dashboardvocalclassesRouter = require('./routes/dashboardvocalclasses');
var dashboardguitarclassesRouter = require('./routes/dashboardguitarclasses');
var dashboardtablaclassesRouter = require('./routes/dashboardtablaclasses');
var dashboardpianoclassesRouter = require('./routes/dashboardpianoclasses');
var dashboardharmoniumclassesRouter = require('./routes/dashboardharmoniumclasses');
var dashboardbookliveconcertRouter = require('./routes/dashboardbookliveconcert');
var dashboardaudiorecordyoursongRouter = require('./routes/dashboardaudiorecordyoursong');
var dashboardvideoshootyoursongRouter = require('./routes/dashboardvideoshootyoursong');
var dashboardsignupcustomerRouter = require('./routes/dashboardsignupcustomer');
var dashboardaccountactivatedRouter = require('./routes/dashboardaccountactivated');





var kambojapi = require('./api/vipinget');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded Vipin
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json Vipin
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/contactus', contactusRouter);
app.use('/users', usersRouter);
//app.use('/templates', templatesRouter);
/*
app.use('/foodandrestaurants', foodandrestaurantsRouter);
app.use('/dashboardfoodandrestaurants', dashboardfoodandrestaurantsRouter);
app.use('/portfolio', portfolioRouter);
app.use('/dashboardportfolio', dashboardportfolioRouter);
app.use('/smallbusiness', smallbusinessRouter);
app.use('/dashboardsmallbusiness', dashboardsmallbusinessRouter);
app.use('/blog', blogRouter);
app.use('/dashboardblog', dashboardblogRouter);
app.use('/vlog', vlogRouter);
app.use('/dashboardvlog', dashboardvlogRouter);
app.use('/marketing', marketingRouter);
app.use('/dashboardmarketing', dashboardmarketingRouter);
app.use('/weddinginvitation', weddinginvitationRouter);
app.use('/dashboardweddinginvitation', dashboardweddinginvitationRouter);
app.use('/webpage', webpageRouter);
app.use('/dashboardwebpage', dashboardwebpageRouter);
app.use('/comingsoon', comingsoonRouter);
app.use('/dashboardcomingsoon', dashboardcomingsoonRouter);
app.use('/phototemplates', phototemplatesRouter);
app.use('/dashboardphototemplates', dashboardphototemplatesRouter);
app.use('/startpagetemplates', startpagetemplatesRouter);
app.use('/dashboardstartpagetemplates', dashboardstartpagetemplatesRouter);
app.use('/othertemplates', othertemplatesRouter);
app.use('/dashboardothertemplates', dashboardothertemplatesRouter);
*/

app.use('/admin', adminRouter);
app.use('/dashboardwebsite', dashboardwebsiteRouter);
app.use('/dashboardcustomer', dashboardcustomerRouter);
app.use('/dashboardadmin', dashboardadminRouter);

//app.use('/dashboardtemplates', dashboardtemplatesRouter);
//app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);
app.use('/forgotusername', forgotusernameRouter);
app.use('/getusername', getusernameRouter);
app.use('/forgotpassword', forgotpasswordRouter);
app.use('/resetpassword', resetpasswordRouter);
app.use('/gallery', galleryRouter);
app.use('/adminstafflist', adminstafflistRouter);
//app.use('/employeeslist', employeeslistRouter);
app.use('/clientslist', clientslistRouter);
//app.use('/career', careerRouter);
//app.use('/dashboardcareer', dashboardcareerRouter);
app.use('/accountactivated', accountactivatedRouter);
//app.use('/employees', employeesRouter);
//app.use('/dashboardemployees', dashboardemployeesRouter);
/*
app.use('/getstarted', getstartedRouter);
app.use('/dashboardgetstarted', dashboardgetstartedRouter);
*/
app.use('/dashboardcart', dashboardcartRouter);
app.use('/inbox', inboxRouter);
app.use('/outbox', outboxRouter);
app.use('/createprofile', createprofileRouter);
app.use('/editprofile', editprofileRouter);
//app.use('/deleteprofile', deleteprofileRouter);
app.use('/delete', deleteRouter);
app.use('/uploadfile', uploadfileRouter);
app.use('/recyclebin', recyclebinRouter);
app.use('/giveaccess', giveaccessRouter);
app.use('/dashboardgallery', dashboardgalleryRouter);
app.use('/dashboardmusicclasses', dashboardmusicclassesRouter);


/*app.use('/pizzarestaurantdemo', pizzarestaurantdemoRouter);
app.use('/cateringtemplatedemo', cateringtemplatedemoRouter);

app.use('/modalrestauranttemplatedemo', modalrestauranttemplatedemoRouter);
app.use('/cafetemplatedemo', cafetemplatedemoRouter);
*/
//portfolio template demo
/*
app.use('/portfoliotemplatedemo', portfoliotemplatedemoRouter);
app.use('/cvresumetemplatedemo', cvresumetemplatedemoRouter);
app.use('/photoportfoliotemplatedemo', photoportfoliotemplatedemoRouter);
app.use('/natureportfoliotemplatedemo', natureportfoliotemplatedemoRouter);
app.use('/peopleportfoliotemplatedemo', peopleportfoliotemplatedemoRouter);
app.use('/peopleportfoliotemplatetwodemo', peopleportfoliotemplatetwodemoRouter);
app.use('/darkportfoliotemplatedemo', darkportfoliotemplatedemoRouter);
app.use('/blackandwhiteportfoliotemplatedemo', blackandwhiteportfoliotemplatedemoRouter);

app.use('/clothingstoretemplatedemo', clothingstoretemplatedemoRouter);
app.use('/interiordesigntemplatedemo', interiordesigntemplatedemoRouter);
app.use('/blogtemplatedemo', blogtemplatedemoRouter);
app.use('/foodblogtemplatedemo', foodblogtemplatedemoRouter);
app.use('/fashionblogtemplatedemo', fashionblogtemplatedemoRouter);
app.use('/cafeblogtemplatedemo', cafeblogtemplatedemoRouter);
app.use('/vlogtemplatedemo', vlogtemplatedemoRouter);
app.use('/marketingwebsitetemplatedemo', marketingwebsitetemplatedemoRouter);
app.use('/weddinginvitationtemplatedemo', weddinginvitationtemplatedemoRouter);
app.use('/webpagetemplatedemo', webpagetemplatedemoRouter);
app.use('/comingsoontemplatedemo', comingsoontemplatedemoRouter);
app.use('/phototemplatedemo', phototemplatedemoRouter);
app.use('/blackandwhitephototemplatedemo', blackandwhitephototemplatedemoRouter);
app.use('/startpagetemplatedemo', startpagetemplatedemoRouter);
app.use('/startuptemplatedemo', startuptemplatedemoRouter);
app.use('/socialmediatemplatedemo', socialmediatemplatedemoRouter);
app.use('/hoteltemplatedemo', hoteltemplatedemoRouter);
app.use('/bandtemplatedemo', bandtemplatedemoRouter);
app.use('/mailtemplatedemo', mailtemplatedemoRouter);
app.use('/freelancerslist', freelancerslistRouter);
app.use('/dashboardfreelancerslist', dashboardfreelancerslistRouter);
app.use('/alladvertisements', alladvertisementsRouter);
*/
app.use('/services', servicesRouter);
app.use('/dashboardservices', dashboardservicesRouter);
app.use('/musicclasses', musicclassesRouter);
app.use('/musicproduction', musicproductionRouter);
app.use('/vocalclasses', vocalclassesRouter);
app.use('/guitarclasses', guitarclassesRouter);
app.use('/tablaclasses', tablaclassesRouter);
app.use('/pianoclasses', pianoclassesRouter);
app.use('/harmoniumclasses', harmoniumclassesRouter);
app.use('/bookliveconcert', bookliveconcertRouter);
app.use('/audiorecordyoursong', audiorecordyoursongRouter);
app.use('/videoshootyoursong', videoshootyoursongRouter);

app.use('/dashboardmusicclasses', dashboardmusicclassesRouter);
app.use('/dashboardmusicproduction', dashboardmusicproductionRouter);
app.use('/dashboardvocalclasses', dashboardvocalclassesRouter);
app.use('/dashboardguitarclasses', dashboardguitarclassesRouter);
app.use('/dashboardtablaclasses', dashboardtablaclassesRouter);
app.use('/dashboardpianoclasses', dashboardpianoclassesRouter);
app.use('/dashboardharmoniumclasses', dashboardharmoniumclassesRouter);
app.use('/dashboardbookliveconcert', dashboardbookliveconcertRouter);
app.use('/dashboardaudiorecordyoursong', dashboardaudiorecordyoursongRouter);
app.use('/dashboardvideoshootyoursong', dashboardvideoshootyoursongRouter);
app.use('/dashboardsignupcustomer', dashboardsignupcustomerRouter);
app.use('/dashboardaccountactivated', dashboardaccountactivatedRouter);


//api
app.use('/api/vipinget', kambojapi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
