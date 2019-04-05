import React, { Component } from 'react';
import './SMS.css';

class SMS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            Group: '',
            people: [
                {Group: '', name: 'adesh', number: '', child: ''}
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
            
          const people = [...state.people, {"Group": state.Group, "name": state.name, "number": state.number, "child": state.name }];
    
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

        let recipesCopy = JSON.parse(JSON.stringify(this.state.people))
        var j, x;
        for(let i = 1; i<this.state.people.length; i++){
            event.preventDefault();
            j = Math.floor(Math.random() * (i + 1)) + 1
            if(j === 0){
              j = 1
            }
            x = recipesCopy[i]
            recipesCopy[i] = recipesCopy[j]
            recipesCopy[j] = x
            console.log(recipesCopy[j])

      }

      for(let i = 1; i<this.state.people.length; i++){
        
          if((i + 1) >= this.state.people.length){
            recipesCopy[i].child = recipesCopy[1].name
          } else {
            console.log(this.state.people.length)
            console.log(recipesCopy[i].child)
            console.log(i)
            console.log(i+1)
            recipesCopy[i].child = recipesCopy[i + 1].name
            console.log(recipesCopy[i+1].name)
          }

          this.setState({ submitting: true });
          fetch('/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipesCopy[i])
            
          })
            .then(data => {
              if (data.success) {
                this.setState({
                  value:'',
              people: [
                {Group: '', name: 'adesh', number: '', child: ''}
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
        <div >
        <form onSubmit={this.onSubmit } 
        className={this.state.error ? 'error sms-form' : 'sms-form'}>
        <input type="text" placeholder="Secret Santa Group" name="Group"
                group ={this.state.value}
                onChange={this.onChangeGroup}
                />
        <ul>
        
        {this.state.people.slice(1).map((item, index) => (
            <div key={item}>
            {item.name} {item.number}
            <button className="SMS-button"
          type="button"
          onClick={() => this.removePeople(index + 1)}> 
          delete </button>
            </div>
          ))}
        </ul>

                <input type="text" placeholder="name" className="name"
                value ={this.state.people.value}
                onChange={this.onChangeName}
                />
               
             
            
                 <input type="text" placeholder="number" name="number"
                number ={this.state.people.value}
                onChange={this.onChangeNumber}
                />
           
                <button type="button"  className= "add"
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

