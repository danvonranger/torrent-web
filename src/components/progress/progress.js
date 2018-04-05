import React, { Component } from 'react';
require('./progress.css');

class Progress extends Component {

    render() {
        return (
            <div className="progressStatus"> 
                Current Status: Retrieving list of TV shows
            </div>
        );
    }
}

export default Progress;