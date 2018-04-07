import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Series from './components/series/series';
import Progress from './components/progress/progress';
// import Poller from './controller';

class App extends Component {

  constructor() {
    super();
    this.timer = null;
    this.state = {};
    this.counter = 0;
    this.serviceSeries = {};
  }

  componentDidMount() {
    this.retrieveSeries()
      .then(() => {
        console.log(this.serviceSeries);
        this.timer = setInterval(() => this.getItems(), 1000);
      });
  }

  retrieveSeries() {
    return fetch('/api/series/')
      .then(res => res.json())
      .then(s => {
        this.serviceSeries = s;
      });
  }

  getItems() {
    if (this.counter === this.serviceSeries.length) {
      console.log('Stopping timer.');
      clearInterval(this.timer);
    } else {
      const series = this.serviceSeries[this.counter];
      this.counter++;
      this.setState({ action: "Updating ", series: series.name });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TV Series</h1>
        </header>
        <Progress data={this.state} />
      </div>
    );
  }
}

export default App;
