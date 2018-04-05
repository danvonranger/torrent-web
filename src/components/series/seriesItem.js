import React, { Component } from 'react';
require('./seriesItem.css');

class SeriesItem extends Component {

    render() {
        return (
            <div className="seriesItemWrapper">
                <div c1assName="seriesItemName">{this.props.item.name}</div>
            </div>
        );
    }
}

export default SeriesItem;