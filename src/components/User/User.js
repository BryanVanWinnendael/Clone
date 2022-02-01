import React, { useState,useEffect } from "react";
import settingsimg from './img/setting.svg'
import defaultimg from './img/default.png'
import {useAuth} from "../../contexts/AuthContext";
import './style.css';
import Settings from "./Settings";
import {storage,db,ad} from "../../util/firebaseapp";
import ImageBoxProfile from "../Home/Images/ImageBoxProfile";

function User() {
    const [buttonPopupSettings, setbuttonPopupSettings] = useState(false);
    const {getProfileImage} = useAuth();
    const profileImg =  getProfileImage()
    const [imagesToLoad, setImagesToLoad] = useState();
    const {currentUser} = useAuth();
 

    useEffect(() => {
        console.log()
        if(!imagesToLoad ){
            const refImages = db.ref('images');
            refImages.on('value', (snapshot) => {
                var data = snapshot.val();
                var images = [];
            
                for (var i in data) {
                    if(currentUser.displayName === data[i].username){
                        var image = data[i].image;
                        var username = data[i].username;
                        var profileImage = data[i].profileImage;
                        var id = data[i].id;
                        images.unshift({ image,  username,profileImage,id});
                    }
                   
                }
                setImagesToLoad(images)
            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            });
        }
      
    }, []);

    return  (
        <div>
            {profileImg && (
                <img src={profileImg} className="profileimg" />
            )}
             {!profileImg && (
                <img src={defaultimg} className="profileimg" />
            )}

             <div className="yourPhotosBox">
                {imagesToLoad
                ? 
                imagesToLoad.map((image, index) => <ImageBoxProfile imageToShow={image}/>
                
                )
                : ""}
             </div>
            <img src={settingsimg} className="settingsimg" onClick={() => setbuttonPopupSettings(true)}/>
            <Settings trigger={buttonPopupSettings} setTrigger={setbuttonPopupSettings}/>
            
        </div>
    );
}

export default User
