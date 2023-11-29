import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {setSession} from '../sessionSlice';
import Home from './Home';
import '../Css/Logout.css';

export default function Logout(){ 
    const s = useSelector(state => state.session.value);
    const dispatch = useDispatch();

    function handleLogout(){
        dispatch(setSession(null));
        window.alert("logout successfully");
    }
    return (
       <div className="logout">
            {s ? <div className="main-logout">
                <label>Click on logout button to logout from all devices</label><br />
                <button onClick={()=> handleLogout()} className="logout-btn">Logout</button>
            </div> : 
                <Home />
            }
       </div>
    );
}