import React, { Component } from 'react';
import './SMSForm.css';

class SMS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            people: [
                {name: "", number: ""}
            ],
            submitting: false,
            error: false
        }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    }

    onChangeName = event => {
        this.setState({ name: event.target.value});
      };

    onChangeNumber = event => {
        this.setState({ number: event.target.value});
      };

    addPeople = () => {
        this.setState(state => {
          const people = [...state.people, {"name": state.name, "number": state.number}];
    
          return {
            people,
            value: '',
          };
        });
      };

    removePeople = i => {
        this.setState(state => {
          const people = state.people.filter((item, j) => i !== j);
    
          return {
            people,
          };
        });
      };

      onSubmit(event) {
          console.log(this.state.people);
        event.preventDefault();
        this.setState({ submitting: true });
        fetch('/api/people', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.people)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setState({
                error: false,
                submitting: false,
                people: [
                    {name: "", number: ""}
                ]
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          });
      }

    render(){
        return (
        <div>
        <form onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}>
        <ul>
        
        {this.state.people.map((item, index) => (
            <li key={item}>{item.name} {item.number}
            <button
          type="button"
          onClick={() => this.removePeople(index)}> 
          delete </button>
            </li>
          ))}
        </ul>
            
                <input type="text" placeholder="name" name="name"
                name ={this.state.value}
                onChange={this.onChangeName}
                />
                {/* <input type="text" placeholder="number"></input> */}
            
                 <input type="text" placeholder="number" name="number"
                number ={this.state.value}
                onChange={this.onChangeNumber}
                />
                {/* <input type="text" placeholder="number"></input> */}
                <button type="button" 
                onClick={this.addPeople} 
                disable={!this.state.value}>add</button>
        <button type="submit" disabled={this.state.submitting}>
          Send message
        </button>     
        </form>    
        </div>

        )}
}
export default SMS;