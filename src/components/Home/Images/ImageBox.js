import React, { useState, useEffect} from "react";
import defaultimg from './img/default.png'
import { useAuth } from "../../../contexts/AuthContext";

export default function ImageBox({imageToShow}) {
    const {getAllProfileImageById} = useAuth();
    const [profileImage, setProfileImage] = useState();

    useEffect(() => {getAllProfileImage()}, [])

    async function getAllProfileImage(){
       const img = await getAllProfileImageById(imageToShow.id)
       setProfileImage(img)
    }


    return (
        <div className="ImageBox">
            <div style={{
                display:"flex",
                margin:"10px"
            }}>
        
            {profileImage && <img src={profileImage} className="profileimgOnBox" alt="image"/>}

            {!profileImage && <img src={defaultimg} className="profileimgOnBox" alt="image" />}

            <p className="displayUsername">{imageToShow.username}</p>
            </div>
           
            {imageToShow && <img src={imageToShow.image} className="pictureToLoad" id={imageToShow.username} id={imageToShow.id} alt="image"/>}
        </div>
    )
}
