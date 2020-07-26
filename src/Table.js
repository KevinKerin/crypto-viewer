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
            dropdown: null,
            currentColumnSorted: "market_cap_rank",
            isReversed: false
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
                // this.sortTable("market_cap_rank")
                console.log(this.state.defaultValue);
            })
    }

    sortTable(columnToBeSorted, defaultDirection){

        const tempArray = this.state.cryptoList
        let reverseSort = (columnToBeSorted === this.state.currentColumnSorted && !this.state.isReversed)

        if (columnToBeSorted === "name" || columnToBeSorted === "symbol"){
            tempArray.sort((a, b) => {
                return (reverseSort ? -1 : 1) * a.props.item[columnToBeSorted].localeCompare(b.props.item[columnToBeSorted]);
            })
        } else if (reverseSort){
            if(defaultDirection === "asc"){
                tempArray.sort((a, b) => b.props.item[columnToBeSorted] - a.props.item[columnToBeSorted]);
            } else {
                tempArray.sort((a, b) => a.props.item[columnToBeSorted] - b.props.item[columnToBeSorted]);
            }
        } else {
            if(defaultDirection === "asc"){
                tempArray.sort((a, b) => a.props.item[columnToBeSorted] - b.props.item[columnToBeSorted]);
            } else {
                tempArray.sort((a, b) => b.props.item[columnToBeSorted] - a.props.item[columnToBeSorted]);
            }
        }
        console.log(tempArray)
        console.log(tempArray.map(item => item.props.item[columnToBeSorted]))

        this.setState({
            currentColumnSorted: columnToBeSorted,
            cryptoList: tempArray,
            currentSortArrangement: columnToBeSorted,
            isReversed: reverseSort
        })
    }

    render(){
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        {/* How to pass id as parameter in onClick method? */}
                        <th id="market_cap_rank" onClick={() => {this.sortTable("market_cap_rank", "asc")}}>Rank</th>
                        <th></th>
                        <th id="name" onClick={() => {this.sortTable("name", "asc")}} style={{textAlign: 'left'}}>Name</th>
                        <th id="symbol" onClick={() => {this.sortTable("symbol", "asc")}}>Symbol</th>
                        <th id="current_price" onClick={() => {this.sortTable("current_price", "desc")}}>Price</th>
                        <th id="market_cap" onClick={() => {this.sortTable("market_cap", "desc")}}>Market Cap</th>
                        <th id="price_change_percentage_24h" onClick={() => {this.sortTable("price_change_percentage_24h", "desc")}}>% Change (24hr)</th>
                        <th id="high_24h" onClick={() => {this.sortTable("high_24h", "desc")}}>24hr High</th>
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