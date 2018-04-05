import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Series from './components/series/series';
import Progress from './components/progress/progress';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TV Series</h1>
        </header>
        <Progress />
        <Series />
      </div>
    );
  }
}

export default App;
