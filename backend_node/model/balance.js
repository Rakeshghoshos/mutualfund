const mongoose = require("mongoose");
const {Schema } = mongoose;

const balanceSchema = new Schema({
    userid : {type : String},
    amount : {type : Number,default : 0}
});

const balancemodel = mongoose.model('balance',balanceSchema);

exports.balancemodel = balancemodel;