import React, { Component } from 'react';
import './App.css';
import SMSForm from './SMSForm';
import TestForm from './test';
import SMS from './SMS';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Group: ''
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ Group: event.target.value });
  // }

  handleChange(event) {
    event.preventDefault();
    fetch(`/api/messages?name=${encodeURIComponent(this.state.Group)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Secret Santa</h1>
          
          <form onChange={this.handleChange}>
            <label htmlFor="name">Secret Santa Group Name </label>
            <input
              id="Group"
              type="text"
              value={this.state.Group}
            />
          </form>
         
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
