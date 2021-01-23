var mongoose = require('mongoose');
require('dotenv').config();
/*mongoose.connect(process.env.DATABASECUSTOMER, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});*/
mongoose.connect(process.env.DATABASEADMIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
    useCreateIndex: true});

var conn = mongoose.Collection;

var recycleBinSchema = new mongoose.Schema({

    DeletedCustomerAccountDetails: {
    type: String    
},
DeletedEmployeeAccountDetails: {
    type: String    
},
DeletedAdminAccountDetails: {
    type: String    
},
DeletedClientMessageDetails: {
    type: String    
},
DeletedOutboxMessageDetails: {
    type: String
},
Date: {
    type: Date,
    default: Date.now
}
});

var recycleBinModel = mongoose.model('recyclebin', recycleBinSchema);
module.exports = recycleBinModel;