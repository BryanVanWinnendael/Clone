import React, { useState,useRef } from "react";
import cancelimg from "./img/cancel.svg"
import {useAuth} from "../../contexts/AuthContext"



function Register(props) {
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();
    const [error, setError] = useState('');    
    const {signup,setName,currentUser,getNames} = useAuth();
    const [loading, setLoading] = useState(false);
    

    const [classpopup, setclasspopup] = useState("classloginup logincard");

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSubmit(e){
    
        e.preventDefault();
    
        if(emailRef.current.value === "" ||passwordRef.current.value === "" || confirmpasswordRef.current.value === ""|| usernameRef.current.value === ""){
            return setError('Please fill in everything');
        }
        
        if(!validateEmail(emailRef.current.value)){
            return setError('Please fill in a valid email');
        }
        
        const names = await getNames()
        if(names.includes(usernameRef.current.value)){
            return setError('Username already exist');
        }

        if(passwordRef.current.value !== confirmpasswordRef.current.value){
            return setError('Password does not match');
        }

        if(passwordRef.current.value.length < 6){
            return setError('Password must be atleast 6 digits long');
        }

        try{
            setError('');
            setLoading(true);
            signup(emailRef.current.value,passwordRef.current.value,usernameRef.current.value) 
            .catch((err) =>  {
                switch(err.code){
                    case 'auth/too-many-requests':
                        setError('Too many tries. Try again later.')
                        break;
                    case 'auth/email-already-in-use':
                        setError('Email is already in use.');
                        break;
                    default:
                        setError('Email already exist.');
                }
            });;
        }
        
        
        catch(FirebaseAuthException){
            setError('Failed to create an account');
        }
        setLoading(false)
    }

   function menudown(){
    setError('');
    setclasspopup("classlogindown logincard");
    setTimeout(() => {props.setTrigger(false);
        setclasspopup("classloginup logincard");}, 400)
   }


    return (props.trigger)? (
        <div className="popuplogin">
            <div className="blur"/>
            <div className={classpopup}>
            <img src={cancelimg} className="cancelimg" onClick={ menudown }  />
            <p><b>Register now</b></p>
            
            {error && <p style={{
                color:'#A71313'
            }}>{error}</p>}

            <form className="loginform" onSubmit={handleSubmit}  >
                <input type="text"  placeholder="Email" ref={emailRef}></input>
                <input type="text"  placeholder="Username" ref={usernameRef}></input>
                <input type="password"  placeholder="Password" ref={passwordRef}></input>
                <input type="password"  placeholder="Confirm Password" ref={confirmpasswordRef}></input>
                <button type="submit" disabled={loading}>Register</button>
            </form>
            </div>
        </div>
    ) : "";
}

export default Register
