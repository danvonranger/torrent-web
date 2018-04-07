import React, { Component } from 'react';
require('./progress.css');

class Progress extends Component {

    render() {
        return (
            <div className="progressStatus"> 
                Current Status: {this.props.data.action} {this.props.data.series}
            </div>
        );
    }
}

export default Progress;