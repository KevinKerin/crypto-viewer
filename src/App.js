import React from 'react';
import Crypto from './Crypto';
import CryptoDetails from './CryptoDetails';
import './App.css';
import './Crypto.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Table from './Table';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

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
    this.componentDidMount = this.componentDidMount.bind(this)
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

      fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
      .then(reply => reply.json())
      .then((replyData) => {
        console.log(replyData)
        this.setState({
          supportedCurrencies: replyData
        });
        console.log(this.state.supportedCurrencies)
      })
  }



  render() {
    return (
      <Router>
        <div className="App">
          {this.state.loading ?
            (<div>Loading...</div>) : 
            <Switch>
              <Route path="/" exact render={(props) => 
                // <Dropdown options={this.state.supportedCurrencies} />
                <Table cryptoData={this.state.cryptoData} cryptoList={this.state.cryptoData}/>
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