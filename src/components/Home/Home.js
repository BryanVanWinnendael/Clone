import React from 'react'
import {useAuth} from "../../contexts/AuthContext";
import LoadImages from './Images/LoadImages';

function Home() {
    const {currentUser,setName,getNames} = useAuth();

   
    return (
        <LoadImages/>
    );
}

export default Home
