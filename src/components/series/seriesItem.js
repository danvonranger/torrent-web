import React, { Component } from 'react';
require('./seriesItem.css');
require('classnames');

class SeriesItem extends Component {
    render() {
        let  seasonClass = 'seriesItemName';
        if (this.props.status) { 
            seasonClass += ' updatedNoData';
        }else{
            seasonClass += ' pendingUpdate';
        }
        return (
            <div className="seriesItemWrapper">
                <div className={seasonClass}>{this.props.item.name}</div>
            </div>
        );
    }
}

export default SeriesItem;