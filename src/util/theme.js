import React from 'react'

export default class theme extends React.Component {
   

    change(){        
        if(localStorage.getItem("theme") === "darkmode") {
            document.body.classList.add("dark-theme")
        }
        
        if(localStorage.getItem("theme") === "lightmode") {
            document.body.classList.remove("dark-theme")
        }
    }

  
}

export const usetheme = new theme();
