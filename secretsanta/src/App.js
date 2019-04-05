import React, { Component } from 'react';
import './App.css';
import './SMS.css';
import SMSForm from './SMSForm';
import TestForm from './test';
import SMS from './SMS';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className= "App-title">Secret Santa</h1>

          {/* <SMSForm /> */}
          {/* <TestForm /> */}
          <SMS />
        </header>
      </div>
    );
  }
}

export default App;
