import React, { useState,useEffect } from "react";
import ImageBox from "./ImageBox";
import {storage,db,ad} from "../../../util/firebaseapp";
import './style.css';

export default function LoadImages() {
    const [imagesToLoad, setImagesToLoad] = useState();

    
    useEffect(() => {
        const refImages = db.ref('images');
        refImages.on('value', (snapshot) => {
            var data = snapshot.val();
            var images = [];
          
            for (var i in data) {
            
                var image = data[i].image;
                var username = data[i].username;
                var profileImage = data[i].profileImage;
                var id = data[i].id;


                images.unshift({ image,  username,profileImage,id});
            }
            setImagesToLoad(images)
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });
    }, []);

    return (
        <div className="ImagesList">
        {imagesToLoad
          ? imagesToLoad.map((image, index) => <ImageBox imageToShow={image}/>)
          : ""}
      </div>
    )
}
