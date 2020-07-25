import React from 'react';
import Crypto from './Crypto';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class Table extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cryptoList: this.props.cryptoData.map(item => <Crypto key={item.id} item={item}/>),
            supportedCurrencies: [],
            defaultValue: null
        }
    }

    componentDidMount(){
        fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    supportedCurrencies: responseData,
                    defaultValue: responseData.indexOf("usd")
                });
            })
    }

    updateCurrency(dropdown){
        console.log(dropdown.value)
    }

    render(){
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th></th>
                        <th style={{textAlign: 'left'}}>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>% Change (24hr)</th>
                        <th>24hr High</th>
                        <th><Dropdown id="currency-dropdown" options={this.state.supportedCurrencies} onChange={this.updateCurrency(this)} defaultValue={this.state.defaultValue}/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.cryptoList}
                    </tbody>
                </table>
            </div>)
    }
}

export default Table;