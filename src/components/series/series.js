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

    render() {
        let updatedIds = this.props.data.updatedIds;
        return (
            <div>
                {this.props.data.series.map(function (item, index) {
                    let updated = updatedIds.indexOf(item.id) > -1;
                    return (
                        <SeriesItem status={updated} item={item} key={index} />
                    );
                })}
            </div>
        );
    }
}

export default Series;