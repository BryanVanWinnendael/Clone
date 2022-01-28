import React, { useState,useRef } from "react";

import addimg from './img/add.svg';
import homeimg from './img/home.svg';
import userimg from './img/user.svg';
import './style.css';
import {useActive} from '../nav/Active';





class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active:useActive.getActive() 
        }
    }


    // setState2(){
    //     console.log("here" + useActive.getActive())
    //     this.setState(prevState => ({
    //         active:useActive.getActive() 
    //     }))
    //     console.log(this.state.active)
    // }

    // setHome(){
    //     console.log(useActive.getActive() )
    //     this.state = {
    //         active:useActive.getActive() 
    //       }
    //     this.setState(prevState => ({
    //         active:useActive.getActive() 
    //     }))
    // }
   
    
  

    handleCheck(e) {
        console.log(e.target.id)
        if(e.target.id == "homeId") {

            useActive.setActive("home")
            this.setState(prevState => ({
                active:useActive.getActive() 
            }))

        }

        if(e.target.id == "addId") {
            useActive.setActive("add")
            this.setState(prevState => ({
                active:useActive.getActive() 
            }))
        }

        if(e.target.id == "userId") {
            useActive.setActive("user")
            this.setState(prevState => ({
                active:useActive.getActive() 
            }))
        }
       
    }
    
    

    render(){
  
    return (
      
        <nav id="navId">
        
            <ul>
                <li ref={this.simulateClick} onClick={this.handleCheck.bind(this)} id="idHome" className={
                    this.state.active == "home" &&(
                        "active"
                    )
                }>
                    <a onClick={ this.props.toggleProjects}>
                        <img src={homeimg} className="iconnav" id="homeId"/>
                    </a>
                </li>

                <li onClick={this.handleCheck.bind(this)} id="idAdd" className={
                    this.state.active == "add" &&(
                        "active"
                    )
                }>
                    <a onClick={this.props.toggleProjects}>
                        <img src={addimg} className="iconnav"  id="addId"/>
                    </a>
                </li>

                <li onClick={this.handleCheck.bind(this)} id="idUser" className={
                    this.state.active == "user" &&(
                        "active"
                    )
                }>
                    <a onClick={this.props.toggleProjects} >
                        <img src={userimg}  className="iconnav" id="userId"/>
                    </a>
                </li>  

            </ul>
    </nav>
   
    )
    }
}

export const useNav = new Nav();

export default Nav
