import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import '../Css/Mf.css';

export default function Mf({schemecode,schemename,nav,handleBuy}){
    const userid = useSelector(state => state.session.value);
    const [bal, setbal] = useState();
    const [amt, setamt] = useState();
    const [success, setsuccess] = useState(null);

    useEffect(()=>{
        axios.post("http://localhost:8080/balance",
            {
                "userid" : userid.toString()
            },{
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            ).then(
                (res)=>{
                    setbal(res.data);
                }
            ).catch(
                (err)=>{
                    console.log(err);
                }
            );
    },[]);

    const val = (e)=>{
        if(bal >= e.target.value){
            setamt(e.target.value);
        }else{
            window.alert("enter value should less than balance");
        }
    }

    const handleAdd = async()=>{
        await axios.post("http://localhost:8080/addportfolio",{
            "userid" : userid.toString(),
            "schemecode" :  schemecode.toString(),
            "schemename" : schemename.toString(),
            "nav" : nav,
            "amountinvest" : amt
        },{
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        ).then(
            ()=>{
                    axios.post("http://localhost:8080/addbalance",
                {
                    "userid" : userid.toString(),
                    "amount" : bal - amt
                },{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }
                ).then(
                    (res)=>{
                        setsuccess(res.data);
                        window.alert("invested successfully");
                        handleBuy();
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
                    }
                );
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        );
    }

    return(
        <div className="main-add">
            <label>Enter the amount you want to invest:</label><br />
            <input type="number" value={amt} onChange={(e)=> val(e)} /><br />
            <button onClick={()=> handleAdd()}>add</button>
        </div>
    );
}