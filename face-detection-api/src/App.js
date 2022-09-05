import React, {Component} from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';


const app = new Clarifai.App({
  apiKey: '15acf4f41ad34709a5ee9c4729e3eb6b'
 });

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
  // console.log(main);

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
};

const particlesLoaded = (container) => {
  // console.log(container);
};

class App extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin'
    }
  }

  calculateFaceLocation =(data) => {
  const clarifaiFace=  data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width =Number(image.width);
  const height = Number(image.height);
  return {
    leftCol   : clarifaiFace.left_col * width,
    topRow    : clarifaiFace.top_row * height,
    rightCol  : width -  (clarifaiFace.right_col*width),
    bottomRow : height - (clarifaiFace.bottom_row * height),
  }
  }
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => {
        console.log(response);
        
        // if (response) {
        //   fetch('http://localhost:3000/image', {
        //     method: 'put',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //       id: this.state.user.id
        //     })
        //   })
        //     .then(response => response.json())
        //     .then(count => {
        //       this.setState(Object.assign(this.state.user, { entries: count}))
        //     })

        // }
        this.displayFaceBox(this.calculateFaceLocation(response))
        
      })
      .catch(err => console.log(err));
   
  }

  onRouteChange = (route)=>{
    this.setState({route: route});
  }
  render(){
   
    return (
      <div className="App">
       <Navigation onRouteChange={this.onRouteChange}/>
     {   
     this.state.route ==='signin'
        ?<Signin onRouteChange ={this.onRouteChange} />
        : <div><Logo />
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
      <FaceRecognition box= {this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
      }
        
      </div>
    );
  }
  
}

export default App;
