import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

import './App.css';
const app = new Clarifai.App({
 apiKey: 'd2f31c559929423fb95f1437d416bb22'
});

const particlesOptions = {
        particles: {
          number: {
            value: 30,
            density: {
              enable: true,
              value_area: 600
            }
          }
        }
      }
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {

  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
        .then(response => this.calculateFaceLocation(response))
        .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}
            />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange = {this.onInputChange} 
          onButtonSubmit = {this.onButtonSubmit}
        />
        
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
