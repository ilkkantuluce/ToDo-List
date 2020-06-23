import React, { Component } from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      newItem: '',
      list: []
    }
}

  componentDidMount(){
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount(){
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage(){
    for(let key in this.state){
      if(localStorage.hasOwnProperty(key)){
        let value = localStorage.getItem(key);

        try{
          value = JSON.parse(value);
          this.setState({[key]: value});
        }
        catch (e){
          this.setState({[key]: value});
        }
      }
    }
  }

  saveStateToLocalStorage(){
    for (let key in this.state){
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }





  updateInput(key, value){
    this.setState({
      [key]:value
    })
  }

  addItem(){
    const newItem={
      id:1+ Math.random(),
      value:this.state.newItem.slice()
    };

    const list = [ ...this.state.list];

    list.push(newItem);

    this.setState({
      list,
      newItem: ''
    })
  }
  deleteItem(id){
    const list = [ ...this.state.list];

    const updateList = list.filter(item => item.id !== id);

    this.setState({list:updateList})
  }

  render() {
    return (
        <div className="App">
          <div className="todo">
            <h1>Todo List</h1>
            <div className="form">
              <input
              type="text"
              placeholder="Type here"
              value={this.state.newItem}
              onChange={e => this.updateInput('newItem', e.target.value)} />
              <button
              onClick={() => this.addItem()}
              >
                Add
              </button>
            </div>
            <ul>
              {this.state.list.map(item =>{
                return(
                  <li key={item.id}>
                    {item.value}
                    <button 
                    onClick={() => this.deleteItem(item.id)}
                    >
                      X
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
    );
  }
}

export default App;
