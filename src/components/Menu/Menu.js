import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import './style.css';
import loginimg from "./img/login.svg";



function Menu(){
    const [buttonPopupLogin, setbuttonPopupLogin] = useState(false);
    const [buttonPopupRegister, setbuttonPopupRegister] = useState(false);




    return(
       
        <div className="menudiv">
       
            <div className="cardMenu">
            <img src={loginimg} className="imagemenu"   />
                <p className="textlogin"> <b>Welcome to Clone </b></p>
                <p>  <b>Sign in now or create an account</b></p>
                <div className="bottomlogin">
                    <button onClick={() => setbuttonPopupLogin(true)} >Sign in</button>
                    <button onClick={() => setbuttonPopupRegister(true)}>Create account</button>
                </div>

            </div>
            <Login trigger={buttonPopupLogin} setTrigger={setbuttonPopupLogin}/>
            <Register trigger={buttonPopupRegister} setTrigger={setbuttonPopupRegister}/>

    </div>
   

    );
}

export default Menu