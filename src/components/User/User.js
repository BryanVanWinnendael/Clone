import React, { useState } from "react";
import settingsimg from './img/setting.svg'
import defaultimg from './img/default.png'
import {useAuth} from "../../contexts/AuthContext";
import './style.css';
import Settings from "./Settings";


function User() {
    const [buttonPopupSettings, setbuttonPopupSettings] = useState(false);
    const {currentUser,getProfileImage} = useAuth();
    const profileImg =  getProfileImage()
 


    return  (
        <div>
            {profileImg && (
                <img src={profileImg} className="profileimg" />
            )}
             {!profileImg && (
                <img src={defaultimg} className="profileimg" />
            )}

            

            <img src={settingsimg} className="settingsimg" onClick={() => setbuttonPopupSettings(true)}/>
            <Settings trigger={buttonPopupSettings} setTrigger={setbuttonPopupSettings}/>

        </div>
    );
}

export default User
