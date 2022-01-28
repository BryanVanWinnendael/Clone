import React, { useState,useRef } from "react";
import cancelimg from "./img/cancel.svg";
import {useAuth} from "../../contexts/AuthContext";


function Login(props) {
    const emailRef = useRef();
    const emailResetRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [errorReset, setErrorReset] = useState('');
    const {login,resetPassword} = useAuth();
    const [loading, setLoading] = useState(false);
    const [loadingReset, setLoadingReset] = useState(false);
    const [ResetSucces, setResetSucces] = useState(false);
    const [classpopup, setclasspopup] = useState("classloginup logincard");
    const [showForgot, setshowForgot] = useState(false);


    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSubmit(e){
      
        e.preventDefault()
        
        if(emailRef.current.value === "" ||passwordRef.current.value === ""){
            return setError('Please fill in everything')
        }

        if(!validateEmail(emailRef.current.value)){
            return setError('Please fill in a valid email');
        }

        try{
            setError('')
            setLoading(true)
            login(emailRef.current.value,passwordRef.current.value).catch((err) =>  {
                switch(err.code){
                    case 'auth/too-many-requests':
                        setError('Too many tries. Try again later.')
                        break;
                    default:
                        setError('Email or password is invalid');
                }
            } );

           
        }
        catch{
            setError('Email or password is invalid')
        }
        setLoading(false)
    }

    async function handleSubmitReset(e){
      
        e.preventDefault()
        
        try{
            setErrorReset('')
            setLoadingReset(true)
            resetPassword(emailResetRef.current.value).then(() => setResetSucces(true)).catch((err) =>  {
                console.log(err)
                switch(err.code){
                    case 'auth/too-many-requests':
                        setErrorReset('Too many tries. Try again later.')
                        break;
                    case 'auth/invalid-email':
                        setErrorReset('Email is invalid.')
                        break;
                    default:
                        setErrorReset('Email is invalid');
                }
            } );

           
        }
        catch{
            setErrorReset('Email invalidd')
        }
        setLoadingReset(false)
    }


   function menudown(){
    setError('');
    setErrorReset('');
    setResetSucces(false);
    setshowForgot(false);
    setclasspopup("classlogindown logincard");
    setTimeout(() => {props.setTrigger(false);
        setclasspopup("classloginup logincard");}, 400)
   }

   function showForgotFunc(){
    if(showForgot){
        setshowForgot(false);
    }
    else{
        setshowForgot(true);
    }
   }


    return (props.trigger)? (
        <div className="popuplogin">
            <div className="blur"/>
            {!showForgot && ( 
            <div className={classpopup}>
            <img src={cancelimg} className="cancelimg" onClick={ menudown }  />
                <p style={{
                    fontWeight:"bolder",
                    fontSize:"large"
                }}>Sign in now</p> 
                {error && <p style={{
                    color:'#A71313'
                }}>{error}</p>}
            
            <form className="loginform" onSubmit={handleSubmit}  novalidate>
                <input type="text"  placeholder="Email" ref={emailRef}
                    ></input>
                <input type="password"  placeholder="Password" ref={passwordRef}
                   ></input>
                <button type="submit" disabled={loading}>Sign in</button>
            </form>
            <p onClick={showForgotFunc} style={{
                fontWeight:"bold",
                cursor:"pointer",
                fontSize:"small",
                color:"#8c56d8",
                textDecoration:"underline"
                
            }}>Forgot password?</p>
            </div>
            )}
             {showForgot && ( 
            <div className={classpopup}>
            <img src={cancelimg} className="cancelimg" onClick={ menudown }  />
                <p style={{
                    fontWeight:"bolder",
                    fontSize:"large"
                }}>Reset Password</p> 
                {errorReset && <p style={{
                    color:'#A71313'
                }}>{errorReset}</p>}
                {ResetSucces && (
                    <p style={{
                        color:'#69aa5e'
                    }}>Email has been send!</p>
                )}
            
            <form className="loginform" onSubmit={handleSubmitReset}  novalidate>
                <input type="text"  placeholder="Email" ref={emailResetRef}
                    ></input>
                <button type="submit" disabled={loadingReset}>Send mail</button>
            </form>
            <p onClick={showForgotFunc} style={{
                fontWeight:"bold",
                cursor:"pointer",
                fontSize:"small",
                color:"#8c56d8",
                textDecoration:"underline"
                
            }}>Sign in</p>
            </div>
            )}
        </div>
    ) : "";
}

export default Login
