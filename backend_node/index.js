const express = require("express");
const nav = require("india-mutual-fund-info");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
const register = require("./model/register");
const balance = require("./model/balance");
const mf = require('./model/mf');

const server = express();
server.use(cors());
server.use(express.json());
const data = fs.readFileSync('data.json','utf-8');

(async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/mutualfund');
    console.log("database connected");
})();
// (async ()=>{
//     const navtoday = await nav.today();
//     fs.writeFile('data.json',JSON.stringify(navtoday),(err)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log("data stored");
//         }
//     })
// })();

const loginmodel = register.loginmodel;
const balancemodel = balance.balancemodel;

server.get('/',(req,res)=>{
    res.send(JSON.parse(data));
});

server.post('/login',async (req,res)=>{
    const reso = await loginmodel.findOne({"userid": req.body.userid,"pass": req.body.pass}).exec();
    if(reso){
        res.send(JSON.stringify(reso.userid));
    }else{
        res.send("Invalid");
    }
});

server.post('/balance',async (req,res)=>{
    const reso = await balancemodel.findOne({"userid": req.body.userid}).exec();
    if(reso){
        res.send(JSON.stringify(reso.amount));
    }else{
        res.send("Invalid");
    }
});

server.post('/addbalance',async (req,res)=>{
    const addBalance = await balancemodel.updateOne({userid : req.body.userid},{amount:req.body.amount},{new : true});
    // addBalance.then(res =>{
    //     console.log(res);
    // }).catch(err=>{
    //     console.log(err);
    // })
    res.send(addBalance);
});

server.post('/register',async (req,res)=>{
    const reso = await loginmodel.findOne({"userid": req.body.userid,"pass": req.body.pass}).exec();
    if(reso){
        res.send("Already registered go to login");
    }else{
        var reslogin,resbal;
    const login = new loginmodel(req.body);
    const bal = new balancemodel({"userid": req.body.userid});
    login.save().then(resu=>{
        reslogin = resu.userid.toString();
        bal.save().then(result=>{
            resbal = result._id.toString();
            if(reslogin && resbal){
                res.send(JSON.stringify(reslogin));
            }else{
                res.send("Invalid");
            }
        }).catch(err => console.log("bal"+" "+err));
    }).catch(err => console.log("login"+" "+err));;
    }
    
});

const mfmodel = mf.mfmodel;
server.post('/addportfolio',async (req,res)=>{

    const mfget = await mfmodel.findOne({schemecode : req.body.schemecode}).exec();
    if(mfget != null){
    const addBalance = await mfmodel.findOneAndUpdate({schemecode : mfget.schemecode},{$set:{amountinvest: parseInt(req.body.amountinvest)+parseInt(mfget.amountinvest)}},{new : true});
    res.send(addBalance);
    }else{
        const mfm = new mfmodel(req.body);
        mfm.save().then(result =>{
            res.send(result);
        }).catch(err =>{ 
            console.log(err);
            res.send(err);
        });
    }
});


server.post('/portfolio',async (req,res)=>{
    const mfget = await mfmodel.find(req.body).exec();
    if(mfget){
        res.send(mfget);
    }else{
        res.send(null);
    }
});

server.post('/portfoliobal',async (req,res)=>{
    const mfget = await mfmodel.findOne(req.body.schemecode).exec();
    if(mfget){
        res.send(mfget.amountinvest);
    }else{
        res.send(null);
    }
});


server.listen(8080);