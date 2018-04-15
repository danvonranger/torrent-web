import React, { Component } from 'react';
require('./progress.css');

class Progress extends Component {

    render() {
        return (
            <div className="progressStatus">{this.props.data.action}</div>
        );
    }
}

export default Progress;