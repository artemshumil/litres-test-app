import React, {Component} from 'react';
import './App.scss';
import {Content} from "./modules/Content/Content";

class App extends Component {
    render () {
        return (
            <div className="content">
                <Content />
            </div>
        );
    }
}

export default App;
