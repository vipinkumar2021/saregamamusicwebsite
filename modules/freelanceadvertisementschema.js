var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASEADMIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var freelanceAdvertisementSchema = new mongoose.Schema({
Username: {
        type: String
    },
Title: {
    type: String
},
Description: {
    type: String
},
AdditionalInformation: {
    type: String
   
},
FreelancerExperienceLevelEntry: {
    type: String
},
FreelancerExperienceLevelIntermediate: {
    type: String
},
FreelancerExperienceLevelExpert: {
    type: String
},
Budget: {
    type: String
},

Date: {
    type: Date,
    default: Date.now
}
});

var freelanceAdvertisementModel = mongoose.model('Advertisements', freelanceAdvertisementSchema);
module.exports = freelanceAdvertisementModel;