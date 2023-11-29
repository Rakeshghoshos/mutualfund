import React,{useState,useRef} from 'react';
import '../Css/Login.css';
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
       const res =  await axios.post("http://localhost:8080/login",
            {
                "userid" : loginData.userid,
                "pass" : loginData.pass
            },{
                headers : {
                    'Content-Type' : 'application/json'
                }
            }   
            );
            window.alert(res.data);
            if(res.data === 'Invalid'){
                errRef.current.innerHTML = "invalid userid or password";
                errRef.current.style.color= 'red';
            }else{
                dispatch(setSession(res.data));
            }
    }
    return(
        <>
        {s ? <Home /> : 
                <div className="main-login">
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
                    <input type="reset" name="reset"/>
                    <span ref={errRef}></span>
                </div>
            <div className="login-reg">
                <span>New User ?</span>&nbsp;&nbsp;<span>Register</span>
            </div>
        </div>
        }
        </>
    );
}