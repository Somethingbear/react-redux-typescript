import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.scss';

import { EviMgr, TestHook } from './features/evidenceMgr/index';

class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
          </p>
          <EviMgr />
          <TestHook />
        </header>
      </div>
    );
  }

}

export default App;
