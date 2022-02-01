import React from "react";

import Navbar from '../nav/Nav';
import {useActive} from '../nav/Active';
import User from '../User/User';
import Home from '../Home/Home';
import Add from '../Add/Add';
import PreviewAdd from '../Add/PreviewAdd';
import HeaderClone from './HeaderClone';

export default class Main extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentView:useActive.getActive(),
           
        }
     
    }

    

    toggleShowProjects = () => {
        this.setState(prevState => ({
            currentView: useActive.getActive()
        }))
    }

   

   

    render(){
    const { currentView } = this.state;
    return (
        <div>
            <HeaderClone param={currentView}/>
            <PreviewAdd/>
            {currentView === 'home' && (<Home/>)}
            {currentView === 'user' && (<User/>)}
            {currentView === 'add' && (<Add toggleProjects={this.toggleShowProjects} rerender={this.rerender}/>)}
            <Navbar toggleProjects={this.toggleShowProjects}/>
        </div>
    )
    }
}

export const useMain = new Main();

