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
            defaultValue: null,
            dropdown: null
        }
    }

    componentDidMount(){
        fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    supportedCurrencies: responseData,
                    defaultValue: responseData.indexOf("usd"),
                    // dropdown: <Dropdown options={responseData} onChange={this.updateCurrency(this)} value={responseData.indexOf("usd")}/>
                });
                console.log(this.state.defaultValue);
            })
    }

    // updateCurrency(dropdown){
    //     console.log(dropdown.value)
    // }

    sortTable(index){
        console.log("Sort table clicked")
        console.log(index)
    }

    render(){
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => {this.sortTable(0)}}>Rank</th>
                        <th></th>
                        <th onClick={() => {this.sortTable(1)}} style={{textAlign: 'left'}}>Name</th>
                        <th onClick={() => {this.sortTable(2)}}>Symbol</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>% Change (24hr)</th>
                        <th>24hr High</th>
                        <th>{this.state.dropdown}</th>
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