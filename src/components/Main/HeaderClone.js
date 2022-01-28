import React from 'react'
import './style.css';
import {useAuth} from "../../contexts/AuthContext";

function HeaderClone({param}) {
    const {currentUser} = useAuth();
   
    return (
        <header>
            {param === 'user' && ( <p>{currentUser.displayName}</p>)}
            {param != 'user' && ( <p>Clne</p>)}
        
        </header>
    )
}

export default HeaderClone
