import React,{useState,useRef,useEffect} from 'react';
import '../Css/Register.css';
import axios from 'axios';
import Home from './Home';
import {useSelector,useDispatch} from 'react-redux';
import {setSession} from '../sessionSlice';

export default function Login(){
    const [loginData, setloginData] = useState({});
    const s = useSelector(state => state.session.value);
    const dispatch = useDispatch();
    const errRef = useRef(); 

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setloginData(prevState =>
            ({...prevState,[name] : value})
        );
    }
    const handleSubmit = async(e)=>{
       const res =  await axios.post("http://localhost:8080/register",
            {
                "name" : loginData.name,
                "userid" : loginData.userid,
                "pass" : loginData.pass
            },{
                headers : {
                    'Content-Type' : 'application/json'
                }
            }   
            );
            if(res.data === "Already registered go to login"){
                window.alert(res.data);
            }else{
                window.alert(res.data);
                window.alert("registered successfull");
                dispatch(setSession(res.data));
            }
    }
    return(
        <>
        {s ? <Home /> : 
            <>
                <div className="main-login">
                <div className="logindiv1">
                    <label htmlFor="name" style={{'width': '100%'}}>Name:</label><br />
                    <input type="text" name="name" id="name" style={{'width': '100%'}} onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="logindiv1">
                    <label htmlFor="userid" style={{'width': '100%'}}>User-id:</label><br />
                    <input type="email" name="userid" id="userid" style={{'width': '100%'}} onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="logindiv2">
                    <label htmlFor="pass" style={{'width': '100%'}}>password:</label><br />
                    <input type="password" name="pass" id="pass" style={{'width': '100%'}} onChange={(e)=>handleChange(e)}/>
                </div>
                <div className="logindiv3">
                    <input type="submit" name="Login" onClick={(e)=>handleSubmit(e)}/>
                    <input type="reset" name="reset" value="reset"/>
                    <span ref={errRef}></span>
                </div>
        </div>
            </>
        }
        </>
    );
}