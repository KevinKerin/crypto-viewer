import React from 'react';
import Crypto from './Crypto';
import CryptoDetails from './CryptoDetails';
import './App.css';
import './Crypto.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Table from './Table';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      loading: true,
      cryptoData: null,
      cryptoItems: null,
      counter: 0,
      supportedCurrencies: []
    }
  }

  async componentDidMount() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")   
    .then(response => response.json())
    .then((responseData) => {
      this.setState({ cryptoData: responseData,
      loading: false});
      console.log(this.state.cryptoData);
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
              <Route path="/" exact render={() => 
                <Table key="crypto-table"/>
              }/>
              <Route path="/crypto/:_id" component={CryptoDetails}/>
            </Switch>
          }
        </div>
      </Router>
    )

  }
}

export default App;