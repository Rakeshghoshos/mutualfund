import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Mfitems from './Mfitems';
import '../Css/Home.css';

export default function Home(){
    const [mfdata, setmfdata] = useState([]);
    const [search, setsearch] = useState("");
    const dataload = async ()=>{
        await axios.get("http://localhost:8080/").
        then(res => {
            setmfdata(res.data);
        }).
        catch(err=> console.log(err));
    }
    useEffect(() => {
       dataload();
    }, [])
    return(
       <>
        <div className="main-home">
        <div className="search">
            <input type="text" name="search" onChange={(e)=>{setsearch(e.target.value)}}/>
        </div>
        <div className="main-section">
            {mfdata.filter((item)=>{
                return search.toLowerCase() === "" ? item : item["Scheme Name"].toLowerCase().includes(search);
            }).map((data,index)=>{
                return(
                   <>
                         <Mfitems key={index} schemecode = {data["Scheme Code"]} schemename = {data["Scheme Name"]} nav = {data["Net Asset Value"]} amcname = {data["AMC Name"]} schemetype = {data["Scheme Type"]}/>
                   </>
                )
            })}
        </div>
        </div>
        </>
    );
}