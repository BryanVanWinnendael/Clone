import React from "react";
import {useNav} from "./Nav";

export default class Active extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active:'home'
        }
    }

    setActive(params) {
       this.state.active = params
        
      
    }

    getActive(){
        return this.state.active;
    }

}


export const useActive = new Active();


