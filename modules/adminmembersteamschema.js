var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASEADMIN, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var adminMembersTeamSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        index: {
                unique: true
            }
    },
/*
    NewMemberEmail: {
    type: String,
    required: true,
    index: {
            unique: true
        }
},
*/
Date: {
    type: Date,
    default: Date.now
}
});

var adminMembersTeamModel = mongoose.model('adminmembersteam', adminMembersTeamSchema);
module.exports = adminMembersTeamModel;