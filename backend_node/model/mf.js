const mongoose = require("mongoose");
const {Schema } = mongoose;

const mfSchema = new Schema({
    userid : String,
    schemecode : String,
    schemename : String,
    nav : Number,
    date : {type : Date, default : Date.now},
    amountinvest : Number
});

const mfmodel = mongoose.model('mfdata',mfSchema);
exports.mfmodel = mfmodel;