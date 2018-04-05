import React, { Component } from 'react';
import SeriesItem from './seriesItem';
require('./series.css');

class Series extends Component {

    constructor() {
        super();
        this.state = {
            series: []
        }
    }

    componentDidMount() {
        fetch('/api/series')
            .then(res => res.json())
            .then(series => this.setState({ series }));
    }

    render() {
        return (
            <div>                
                 {this.state.series.map(function (item, index) {
                   return(
                       <SeriesItem item={item} key={index} />
                   );
                })}
            </div>
        );
    }
}

export default Series;