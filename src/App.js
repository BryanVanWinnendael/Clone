import React from "react";
import './App.css';
import Menu from './components/Menu/Menu';
import Main from './components/Main/Main';
import { useAuth} from './contexts/AuthContext';
import {usetheme} from "./util/theme";


function App() {
  
  
  const {currentUser} = useAuth();
  usetheme.change()
  return (
    
      <div className="App">
     {currentUser &&  <Main/>}
     {!currentUser && <Menu/>}
     
      </div>
       
 
  );
}

export default App;
