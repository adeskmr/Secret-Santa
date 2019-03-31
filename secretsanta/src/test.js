import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      list: ['a', 'b', 'c'],
    };
  }

  onChangeValue = event => {
    this.setState({ value: event.target.value });
  };

  
  onAddItem = () => {
    this.setState(state => {
      const list = [...state.list, state.value];

      return {
        list,
        value: '',
      };
    });
  };

  onRemoveItem = i => {
    this.setState(state => {
      const list = state.list.filter((item, j) => i !== j);

      return {
        list,
      };
    });
  };


  render() {
    return (
      <div>
        <ul>
        {this.state.list.map((item, index) => (
            <li key={item}>{item}
            <button
          type="button"
          onClick={() => this.onRemoveItem(index)}
         
        >
          delete
        </button>
            </li>
        
          ))}
        </ul>

        <input
          type="text"
          value={this.state.value}
          onChange={this.onChangeValue}
        />
        <button
          type="button"
          onClick={this.onAddItem}
          disabled={!this.state.value}
        >
          Add
        </button>
        
      </div>
    );
  }
}

export default App;