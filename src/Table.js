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
<<<<<<< HEAD
            defaultValue: null,
            dropdown: null
=======
            defaultValue: null
>>>>>>> 287f3ae4f9d02ead61da0f41d339f66a2eacaf54
        }
    }

    componentDidMount(){
        fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    supportedCurrencies: responseData,
<<<<<<< HEAD
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
=======
                    defaultValue: responseData.indexOf("usd")
                });
            })
    }

    updateCurrency(dropdown){
        console.log(dropdown.value)
>>>>>>> 287f3ae4f9d02ead61da0f41d339f66a2eacaf54
    }

    render(){
        return (
            <div>
                <table>
                    <thead>
                    <tr>
<<<<<<< HEAD
                        <th onClick={() => {this.sortTable(0)}}>Rank</th>
                        <th></th>
                        <th onClick={() => {this.sortTable(1)}} style={{textAlign: 'left'}}>Name</th>
                        <th onClick={() => {this.sortTable(2)}}>Symbol</th>
=======
                        <th>Rank</th>
                        <th></th>
                        <th style={{textAlign: 'left'}}>Name</th>
                        <th>Symbol</th>
>>>>>>> 287f3ae4f9d02ead61da0f41d339f66a2eacaf54
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>% Change (24hr)</th>
                        <th>24hr High</th>
<<<<<<< HEAD
                        <th>{this.state.dropdown}</th>
=======
                        <th><Dropdown id="currency-dropdown" options={this.state.supportedCurrencies} onChange={this.updateCurrency(this)} defaultValue={this.state.defaultValue}/></th>
>>>>>>> 287f3ae4f9d02ead61da0f41d339f66a2eacaf54
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