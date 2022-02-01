import React from "react";

export default class Url extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'',
            
        }
    }


    setUrl(params) {
        
        this.state.url = params;
    }

    getUrl(){
        return this.state.url;
    }

   

}


export const useUrl = new Url();


