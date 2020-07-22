import React from 'react';
import logo from './logo.svg';
import Crypto from './Crypto';
import './App.css';
import './Crypto.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Table from './Table';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      loading: true,
      data: null,
      cryptoList: null,
      cryptoItems: null,
      counter: 0
    }
    // this.setCounter = this.setCounter.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")   
    .then(response => response.json())
    .then((responseData) => {
      this.setState({ data: responseData,
      cryptoList: responseData.map(item => <Crypto key={item.id} item={item}/>),
      loading: false});
      console.log(this.state.data);
      console.log(this.state.cryptoList);
    })
    .catch(error => {
      console.log(error);
      this.setState({ error })});
  }



  render() {
    return (
      <Router>
        <div className="App">
          {this.state.loading ?
            (<div>Loading...</div>) : 
            <Switch>
              <Route path="/" exact render={(props) => <Table cryptoList={this.state.cryptoList}/>}/>
              <Route path='/:cryptoId' component={Crypto}/>
            </Switch>
          }
        </div>
      </Router>
    )

  }
}

export default App;