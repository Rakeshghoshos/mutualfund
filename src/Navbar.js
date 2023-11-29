import React from 'react'
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './Css/Navbar.css';

export default function Navbar(){
    const s = useSelector(state => state.session.value);
    return(
        <div className="main-nav">
            {s ? <>
            <div className="navdiv1">
            <ul className="navul1">
                <li><NavLink to="/" style={{"color": 'white'}}>Home</NavLink></li>
                <li><NavLink to="/portfolio" style={{"color": 'white'}}>Portfolio</NavLink></li>    
            </ul>
            </div>
           <div className="navdiv2"> 
                <ul className="navul2">
                   <li><NavLink to="/logout" style={{"color": 'white'}}>Logout</NavLink></li>
               </ul>
           </div>
           </> :
           <>
                <div className="navdiv1">
            <ul className="navul1">
                <li><NavLink to="/" style={{"color": 'white'}}>Home</NavLink></li>    
            </ul>
            </div>
           <div className="navdiv2"> 
                <ul className="navul2">
                <li><NavLink to="/register" style={{"color": 'white'}}>Register</NavLink></li>
                    <span  style={{"color": 'white'}}>or</span>
                   <li><NavLink to="/login" style={{"color": 'white'}}>Login</NavLink></li>
               </ul>
           </div>
           </>
        }
        </div>
    );
}