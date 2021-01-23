var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASEADMIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var chatBoxSchema = new mongoose.Schema({

Username : {
    type: String,
    required: true
},
AdvertisementId: {
    type: String,
    required: true
},
WriteMessage: {
    type: String
    
},
Date: {
    type: Date,
    default: Date.now
}
});

var chatBoxModel = mongoose.model('chatmessages', chatBoxSchema);
module.exports = chatBoxModel;