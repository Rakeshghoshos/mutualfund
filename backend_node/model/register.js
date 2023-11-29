const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginschema = new Schema({
    name : {type : String},
    userid : {type:String},
    pass : {type : String}
});

const loginmodel = mongoose.model('login',loginschema);

exports.loginmodel = loginmodel;