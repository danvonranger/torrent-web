import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Series from './components/series/series';
import Progress from './components/progress/progress';
import WebService from './data/web-service';
import DownloadManager from './download/download-manager';
import MagnetLinkDownloader from './download/magnet-downloader';
const cheerio = require('cheerio');
const config = require('./config/config');


class App extends Component {

  constructor() {
    super();

    this.state = {
      updatedIds: [],
      series: [],
      action: ""
    }
  }

  async componentDidMount() {
    this.setProgress(`Retrieving TV series from server`);
    const serviceSeries = await WebService.retrieveSeriesAsync();
    this.setState({ series: serviceSeries });
    this.triggerUpdate();
  }
  async delay() {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async triggerUpdate() {
    for (let series of this.state.series) {
      this.setProgress(`Retrieving updates for: ${series.name}`);
      this.markAsUpdated(series);
      const torrentInformation = await DownloadManager.getTorrentInformation(series);
      console.log(torrentInformation);
      for (let torrent of torrentInformation) {
        const res = await WebService.triggerDownload(torrent);
        if (res === true) {
          await WebService.markComplete(torrent);
        }
      }
    }
    this.setProgress(`All updates completed.`);
    console.log('done');
  }

  markAsUpdated(series) {
    let updatedSoFar = this.state.updatedIds;
    updatedSoFar.push(series.id);
    this.setState({ updatedIds: updatedSoFar });
  }

  setProgress(progressMessage) {
    this.setState({ action: progressMessage });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TV Series</h1>
        </header>
        <Progress data={this.state} />
        <Series data={this.state} />
      </div>
    );
  }
}

export default App;
