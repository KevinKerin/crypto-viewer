import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      loading: true,
      person: null,
      counter: 0
    }
    this.setCounter = this.setCounter.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const url = "https://api.randomuser.me"
    const response = await fetch(url)
    const data = await response.json();
    // this.state.person = data.results[0]
    this.setState({
      person: data.results[0],
      loading: false
    })
    console.log(this.state.person.location.city)
    console.log(this.state.person.location.state)
    console.log(this.state.person.location.country)

  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.counter} times`;
  }
  
  setCounter(){
    this.setState((prevState) => {
      return {
        counter: (prevState.counter + 1)
      }
    })
  }

  render() {
    return (<div className="App">
      {this.state.loading ? (
        <div>Loading...</div>
      ) : <div>{this.state.person.name.first} {this.state.person.name.last}
      <img src={this.state.person.picture.large}/></div>}
    </div>)

}
}
export default App;