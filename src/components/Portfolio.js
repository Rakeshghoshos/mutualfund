import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import '../Css/Portfolio.css';

export default function Portfolio(){
    const [mfdata, setmfdata] = useState([]);
    const [amount, setamount] = useState(0);
    const userid = useSelector(state => state.session.value);
    useEffect(() => {
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
                    setamount(res.data);
                }
            ).catch(
                (err)=>{
                    console.log(err);
                }
            );
        
        axios.post("http://localhost:8080/portfolio",
            {
                "userid" : userid.toString()
            },{
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            ).then(
                (res)=>{
                    setmfdata(res.data);
                }
            ).catch(
                (err)=>{
                    console.log(err);
                }
            );
    }, [userid]);

    return (
    <div className="main-mfdata">
        <div className="amt">
            balance : {amount}</div>
        <div className="main-mf">{
        mfdata.map((data,index)=>{
            return(
                <div className="mf">
                    <div>{data.schemename}</div>
                    <div>{data.code}</div>
                    <div>{data.date}</div>
                    <div>{data.nav}</div>
                    <div>{data.amountinvest}</div>
                </div>
            )
        })
    }
        </div>
        </div>
    );
}