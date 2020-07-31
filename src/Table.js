import React from 'react';
import Crypto from './Crypto';
import 'react-dropdown/style.css';
import { currencySymbols } from './currencySymbols.js';

class Table extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            cryptoData: [],
            filteredCryptoData: [],
            supportedCurrencies: [],
            searchBarValue: "",
            selectedCurrency: "usd",
            selectedCurrencySymbol: "",
            currentColumnSorted: "market_cap_rank",
            isReversed: false
        }

    }

    async componentDidMount() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")   
        .then(response => response.json())
        .then((responseData) => {
          this.setState({
            cryptoData: responseData,
            filteredCryptoData: responseData,
            loading: false});
        })
        .catch(error => {
          console.log(error);
          this.setState({ error })});

        fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
            .then(response => response.json())
            .then((responseData) => {
                this.setState({
                    supportedCurrencies: responseData,
                    defaultValue: responseData.indexOf("usd"),
                });
            })
    }

    createDropdownButtons(){
        let dropdownButtonList = this.state.supportedCurrencies.map(currency => {
            return <option key={currency} value={currency}>{currency.toUpperCase()}</option>
        })
        return dropdownButtonList
    }

    setCurrency(){
        for (const currency of currencySymbols){
            if (currency.code === this.state.selectedCurrency.toUpperCase()){
                return currency
            }
        }
        return this.state.selectedCurrency.toUpperCase()
    }

// Need to fix up
    sortTable(columnToBeSorted, defaultDirection){

        const tempArray = this.state.filteredCryptoData

        let reverseSort = (columnToBeSorted === this.state.currentColumnSorted && !this.state.isReversed)

        if (columnToBeSorted === "name" || columnToBeSorted === "symbol"){
            tempArray.sort((a, b) => {
                return (reverseSort ? -1 : 1) * a[columnToBeSorted].localeCompare(b[columnToBeSorted]);
            })
        } else if (reverseSort){
            if(defaultDirection === "asc"){
                tempArray.sort((a, b) => b[columnToBeSorted] - a[columnToBeSorted]);
            } else {
                tempArray.sort((a, b) => a[columnToBeSorted] - b[columnToBeSorted]);
            }
        } else {
            if(defaultDirection === "asc"){
                tempArray.sort((a, b) => a[columnToBeSorted] - b[columnToBeSorted]);
            } else {
                tempArray.sort((a, b) => b[columnToBeSorted] - a[columnToBeSorted]);
            }
        }

        this.setState({
            currentColumnSorted: columnToBeSorted,
            cryptoData: tempArray,
            filteredCryptoData: tempArray,
            currentSortArrangement: columnToBeSorted,
            isReversed: reverseSort
        })


        console.log(this.state.cryptoData)
        console.log(this.state.filteredCryptoData)
    }

    updateTable(event){
        this.setState({
            loading: true
        })
        let newCurrency = event.target.value;
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${newCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)   
            .then(response => response.json())
            .then((responseData) => {
                this.setState({
                    cryptoData: responseData,
                    filteredCryptoData: responseData,
                    selectedCurrency: newCurrency,
                    loading: false
                });
                console.log(this.state.cryptoData);
            })
            .catch(error => {
            console.log(error);
            this.setState({ error })
        });
    }

    handleChange(event){

        let tempArray = [];
        for (let currency of this.state.cryptoData){
            if (currency.name.toUpperCase().includes(event.target.value.toUpperCase())  || currency.symbol.toUpperCase().includes(event.target.value.toUpperCase())){
                tempArray.push(currency)
            }
        }
        console.log(tempArray)

        this.setState({
            searchBarValue: event.target.value,
            filteredCryptoData: tempArray
        })
    }

    render(){
        return (
            <div>
                {this.state.loading ? (<div>Loading...</div>) :
                <div>
                <select value={this.state.selectedCurrency} onChange={(event) => this.updateTable(event)}>
                    {this.createDropdownButtons()}
                </select>
                <input type="text" value={this.state.searchBarValue} onChange={(event) => this.handleChange(event)} />
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredCryptoData.map(item => <Crypto key={item.id} item={item} selectedReferenceCurrency={this.setCurrency()}/>)}
                    </tbody>
                </table>
                </div>}
            </div>
        )
    }
}

export default Table;