import React, { Component } from 'react';
import './App.css';
import SMSForm from './SMSForm';
import TestForm from './test';
import SMS from './SMS';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Secret Santa</h1>
          
         
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          {/* <SMSForm /> */}
          {/* <TestForm /> */}
          <SMS />
        </header>
      </div>
    );
  }
}

export default App;
