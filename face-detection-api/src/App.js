import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesJS from './Particles/ParticlesJS';
import './App.css';

class App extends Component{
  
  render(){
   
    return (
      <div className="App">
       <Navigation />
         <Logo />
         <Rank/>
         <ImageLinkForm/>
         <ParticlesJS/>
         {/*
        <FaceRecognition/> */}
        
      </div>
    );
  }
  
}

export default App;
