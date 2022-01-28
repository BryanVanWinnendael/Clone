import React, { useState ,useRef} from "react";
import {storage} from "../../util/firebaseapp";
import defaultimg from './img/default.png'
import {useAuth} from "../../contexts/AuthContext";

export default function ProfileImage() {
    const {currentUser,getProfileImage,setProfileImage} = useAuth();
 
    const profileimageRef = useRef();
    const [progress, setProgress] = useState(false);
   
    const [profileimageupload,setProfileimageupload] =  useState('');
    const [url, setUrl] = useState(getProfileImage());
    var fileuploadImage;
    async function handleSubmitProfile(e){   
        e.preventDefault()
        const uploadTask = storage.ref(`ProfileImages/${currentUser.uid}/profileImage`).put(profileimageupload);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref(`ProfileImages/${currentUser.uid}`)
              .child("profileImage")
              .getDownloadURL()
              .then(url => {
                setUrl(url);
                setProfileImage(url)
              });
          }
        );
        
        setProgress(true);
    }
    
   

    async function preview(e){
        setProgress(false);
        fileuploadImage = await e.target.files[0]
        setProfileimageupload(e.target.files[0])
        var reader; 
        
        reader = new FileReader();
        reader.onload = function () {
            setUrl(reader.result)

        }
        reader.readAsDataURL(fileuploadImage)
     
    }


    return (
        <div style={{
            margin:"100px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
        }}>
            {progress && (
                <p style={{
                    color:'#69aa5e'
                }}>Profile Image changed successfully</p>
            )}
            
            {url && (
                <img src={url} className="profileimgshow" />
            )}
             {!url && (
                <img src={defaultimg} className="profileimgshow" />
            )}
         
            <form className="profileform" onSubmit={handleSubmitProfile}  >
                    <input style={{
                        width:"100%",
                        border:"none"
                    }} type="file"  placeholder="new password" ref={profileimageRef} onChange={preview}></input>
                    <button type="submit">Change Profile Image</button>
            </form>
          

        </div>
    )
}
