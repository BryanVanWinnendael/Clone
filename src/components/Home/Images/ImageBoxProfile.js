import React, { useState, useEffect} from "react";
import defaultimg from './img/default.png'
import { useAuth } from "../../../contexts/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ImageBoxProfile({imageToShow}) {
    const {getAllProfileImageById,removePhoto} = useAuth();
    const [profileImage, setProfileImage] = useState();

    useEffect(() => {getAllProfileImage()}, [])

    async function getAllProfileImage(){
       const img = await getAllProfileImageById(imageToShow.id)
       setProfileImage(img)
    }

    function deleteImage(){
        removePhoto(imageToShow.image)
    }

    return (
        <div className="ImageBox">
            <div style={{
                display:"flex",
                margin:"10px"
            }}>
        
            {profileImage && <img src={profileImage} className="profileimgOnBox" alt="image"/>}

            {!profileImage && <img src={defaultimg} className="profileimgOnBox" alt="image"/>}

            <p className="displayUsername">{imageToShow.username}</p>
            <div style={{
                width:"100%",
                display:"flex",
                justifyContent:"flex-end"
            }}>
            <DeleteIcon sx={{
                width:"30px",
                height:"45px",
                cursor:"pointer"
            }}
            onClick={deleteImage}
            id="eee"
            />
            </div>
            </div>
            
            {imageToShow && <img src={imageToShow.image} className="pictureToLoad" id={imageToShow.username} alt="image"/>}
           
            
        </div>
    )
}
