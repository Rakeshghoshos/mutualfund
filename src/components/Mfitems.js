import React,{useState} from 'react'
import '../Css/Mfitems.css'
import Mf from './Mf';
import {useSelector} from 'react-redux';

export default function Mfitems({key,schemecode,schemename,nav,amcname,schemetype}){
   const [show, setshow] = useState(false);
   const userid = useSelector(state => state.session.value);
    const handleBuy = ()=> {
        setshow(!show);
    }
    return(
        <>
        <div className="main-items">
            <label>scheme-code</label><label>{schemecode}</label><br />
            <label>scheme-name</label><label>{schemename}</label><br />
            <label>amc-name</label><label>{amcname}</label><br />
            <label>scheme-type</label><label>{schemetype}</label><br />
            <label>nav</label><label>{nav}</label><br />
            {userid && <button className="btn-items" onClick={()=> handleBuy()}>buy</button>}
        </div>

        {show && <Mf schemecode = {schemecode} schemename={schemename} nav={nav} handleBuy={handleBuy}/>}
        </>
    ); 
}