import React, { Component } from 'react';
import App from './App';
import { BrowserRouter as Router  } from 'react-router-dom'

class Second extends Component {
    render() {
        return (
            <Router>
                    <div>
                        <App />
                    </div>
            </Router>
        );
    }
}

export default Second;