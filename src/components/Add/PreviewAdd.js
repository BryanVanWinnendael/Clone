import React from "react";
import {useUrl} from "./Url";

import './style.css';

export default function PreviewAdd() {

   
    return (
        <div>
        {
        useUrl.getUrl() &&(
  
  
        <div className="prebox">
        <div className="previewAdd3">
            <img src={useUrl.getUrl()} className="previewAddimg" />
        </div>
        </div>
   
        )
    }
         </div>
    )
}
