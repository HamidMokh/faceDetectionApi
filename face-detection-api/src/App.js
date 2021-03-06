import React, {Component} from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {ClarifaiStub, grpc} from "clarifai-nodejs-grpc";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';



const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call.
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key {15acf4f41ad34709a5ee9c4729e3eb6b}");

const particlesOptions= { 
  fpsLimit: 120,
   interactivity: {
     events: {
       onClick: {
         enable: true,
         mode: "push",
       },
       onHover: {
         enable: true,
         mode: "repulse",
       },
       resize: true,
     },
     modes: {
       push: {
         quantity: 3,
       },
       repulse: {
         distance: 200,
         duration: 0.4,
       },
     },
   },
   particles: {
     color: {
       value: "#ffffff",
     },
     links: {
       color: "#ffffff",
       distance: 150,
       enable: true,
       opacity: 0.5,
       width: 1,
     },
     collisions: {
       enable: false,
     },
     move: {
       direction: "none",
       enable: true,
       outModes: {
         default: "bounce",
       },
       random: false,
       speed: 1,
       straight: false,
     },
     number: {
       density: {
         enable: true,
         area: 800,
       },
       value: 80,
     },
     opacity: {
       value: 0.5,
     },
     shape: {
       type: "circle",
     },
     size: {
       value: { min: 1, max: 5 },
     },
   },
   
 }

const particlesInit = async (main) => {
  console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
};

const particlesLoaded = (container) => {
  console.log(container);
};

class App extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
    }
  }

  onInputChange =(event)=>{
    console.log(event.target.value)
  }

  onButtonSubmit = ()=>{
    console.log('click');
    metadata.models.predict("15acf4f41ad34709a5ee9c4729e3eb6b","https://www.newscientist.com/article/2308312-fake-faces-created-by-ai-look-more-trustworthy-than-real-people/").
    then( 
      function(response){
        console.log(response)
      },
      function(err){

      }
      );
  }
  render(){
   
    return (
      <div className="App">
       <Navigation />
         <Logo />
         <Rank/>
         <ImageLinkForm 
         onInputChange={this.onInputChange}
         onButtonSubmit={this.onButtonSubmit}/>
         <Particles className='particles'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
    />
      {/* <FaceRecognition/> */}
        
      </div>
    );
  }
  
}

export default App;
