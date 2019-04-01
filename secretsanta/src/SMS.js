import React, { Component } from 'react';


class SMS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            Group: '',
            people: [
                {Group: '', name: '', number: '', child: ''}
            ],
            submitting: false,
            error: false
        }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    }

    onChangeGroup = event => {
        this.setState({ Group: event.target.value});
      };

    onChangeName = event => {
        this.setState({ name: event.target.value});
      };

    onChangeNumber = event => {
        this.setState({ number: event.target.value});
      };

    addPeople = () => {
        this.setState(state => {
          const people = [...state.people, {"Group": state.Group, "name": state.name, "number": state.number, "child": state.people[0].name}];
    
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

        for(let i = 0; i<this.state.people.length; i++){
        event.preventDefault();
        this.setState({ submitting: true });
        fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.people[i])
        })
          .then(data => {
            if (data.success) {
              this.setState({
                value:'',
            people: [
                {name: " ", number: " "}
            ],
            submitting: false,
            error: false
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          });
      }
    }

    render(){
        return (
        <div>
        <form onSubmit={this.onSubmit } 
        className={this.state.error ? 'error sms-form' : 'sms-form'}>
        <input type="text" placeholder="Secret Santa Group" name="Group"
                group ={this.state.value}
                onChange={this.onChangeGroup}
                />
        <ul>
        
        {this.state.people.map((item, index) => (
            <div key={item}>
            {item.name} {item.number}
            <button
          type="button"
          onClick={() => this.removePeople(index)}> 
          delete </button>
          <input type="text" placeholder="name" name="name"
                name ={this.state.people.value}
                onChange={this.onChangeName}
                />
               
                {/* <input type="text" placeholder="number"></input> */}
            
                 <input type="text" placeholder="number" name="number"
                number ={this.state.people.value}
                onChange={this.onChangeNumber}
                />
            </div>
          ))}
        </ul>

                
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

