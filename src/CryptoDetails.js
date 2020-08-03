import React from 'react';
import './CryptoDetails.css';
import Button from './Button';
import Moment from 'react-moment';
import { currencySymbols } from './currencySymbols.js';
// import {Switch, Link, Route} from 'react-router-dom';c

class CryptoDetails extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            testProp: null,
            isLoading: true,
            isRefreshed: false,
            data: null,
            id: this.props.match.params._id,
            item : this.props.item,
            symbol: null,
            selectedReferenceCurrencyCode: 
                (props.location.aboutProps != null ? props.location.aboutProps.selectedReferenceCurrency.code.toLowerCase()
                : "usd"),
            selectedReferenceCurrencySymbol: 
                (props.location.aboutProps != null ? props.location.aboutProps.selectedReferenceCurrency.symbol
                : "$"),
            description: null,
            error: null,
            announcement_url: [],
            blockchain_site: [],
            chat_url: [],
            homepage: [],
            official_forum_url: [],
            subreddit_url: null,
            repos_url: {
                bitbucket: [],
                github: []
            }
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        fetch(`https://api.coingecko.com/api/v3/coins/${this.state.id}`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    data: response,
                    symbol: response.symbol,
                    description: response.description.en,
                    isLoading: false,
                    announcement_url: response.links.announcement_url,
                    blockchain_site: response.links.blockchain_site,
                    chat_url: response.links.chat_url,
                    homepage: response.links.homepage,
                    official_forum_url: response.links.official_forum_url,
                    subreddit_url: response.links.subreddit_url,
                    repos_url: response.links.repos_url
                })
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: error,
                    isLoading: false
                })
            });
    }

    refresh(){

        fetch(`https://api.coingecko.com/api/v3/coins/${this.state.id}`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    data: response,
                    symbol: response.symbol,
                    description: response.description.en,
                    announcement_url: response.links.announcement_url,
                    blockchain_site: response.links.blockchain_site,
                    chat_url: response.links.chat_url,
                    homepage: response.links.homepage,
                    official_forum_url: response.links.official_forum_url,
                    subreddit_url: response.links.subreddit_url,
                    repos_url: response.links.repos_url
                })
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: error
                })
            })

            if (this.state.error === null){
                setTimeout(
                    () => {
                        this.setState({
                            isRefreshed: true
                        })
                    }, 2000
                )
                
                setTimeout(
                    () => {
                        this.setState({
                            isRefreshed: false
                        });
                    }, 4000
                );
            }
    }

    createLinks(websiteArray, websiteListHeading){
        let listEmpty = true;
        for(let website of websiteArray){
            if (website.length > 0){
                listEmpty = false;
                break;
            }
        }
        if (listEmpty){
            return [];
        }
        
        return (
            <tr>
                <td className="link-table-td">{websiteListHeading}</td>{this.createButtons(websiteArray, websiteListHeading)}
            </tr>
        )
    }

    createButtons(websiteArray, websiteListHeading){
        const buttonList = websiteArray.map(website => {
            if(website !== null && website.length > 0){
                let firstChar;
                let websiteName;
                let lastChar;
                if(websiteListHeading === "GitHub Urls"){
                    firstChar = website.indexOf("github") + 10;
                    websiteName = website.substring(firstChar);
                } else if(websiteListHeading === "BitBucket Urls"){
                    firstChar = website.indexOf("bitbucket") + 13;
                    websiteName = website.substring(firstChar);
                } else {
                    firstChar = website.indexOf('://') + 3;
                    websiteName = website.substring(firstChar);
                    lastChar = website.indexOf('/', firstChar);
                }
                if(lastChar !== -1){
                    websiteName = website.substring(firstChar, lastChar);
                }
                if(websiteName.startsWith('www.')){
                    websiteName = websiteName.substring(4);
                }
                if(websiteName.length > 14){
                    websiteName = websiteName.substring(0, 11) + "...";
                }
                return (<td className="link-table-td"><Button style={{margin: '10px;'}} key={website} href={website} name={websiteName}/></td>);
            }
        })
        return buttonList;
    }

    updateCurrency(currencyCode){
        let currencySymbol = null;
        for (let currency of currencySymbols){
            if (currency.code === currencyCode.toUpperCase()){
                currencySymbol = currency.symbol
                break;
            }
        }
        if (currencySymbol === null){
            currencySymbol = currencyCode.toUpperCase()
        }
        this.setState({
            selectedReferenceCurrencySymbol: currencySymbol,
            selectedReferenceCurrencyCode: currencyCode
        });
    }

    setNumberPercentageTable(number){
        if (number >= 0){
            return (<td style={{color: 'green'}}>{number}%</td>)
        }
        return (<td style={{color: 'red'}}>{number}%</td>)
    }

    setNumberCurrencyTable(currencyCode, currencySymbol){
        let marketData = this.state.data.market_data
        let priceChange24h = marketData.price_change_24h_in_currency[currencyCode]

        return <td>{currencySymbol}{marketData.current_price[currencyCode]} <br/>
        <span style={{color: (priceChange24h >= 0) ? 'green' : 'red'}}>
            {priceChange24h >= 0 ? '+' : ''}{priceChange24h}</span></td>
    }

    createCurrencyButtons(){
        let buttonArray = []
        let counter = 1
        for (let currency of Object.keys(this.state.data.market_data.current_price)){
            if (counter % 20 === 0){
                buttonArray.push(<br/>)
            }else {
                buttonArray.push(<button className="currency-button" onClick={() => {this.updateCurrency(currency)}}>{currency.toUpperCase()}</button>)
            }
            counter++
        }
        return buttonArray
    }

    renderResult(){

        const data = this.state.data
        const description = data.description.en
        const marketCapRank = data.market_cap_rank
        const hashingAlgorithm = data.hashing_algorithm
        const selectedReferenceCurrencyCode = this.state.selectedReferenceCurrencyCode
        const selectedReferenceCurrencySymbol = this.state.selectedReferenceCurrencySymbol
        const currentPrice = data.market_data.current_price[selectedReferenceCurrencyCode]
        const formattedSymbol = data.symbol.toUpperCase();
        const priceChangePercentage24h = (Math.round(data.market_data.price_change_percentage_24h * 100) / 100).toFixed(2);
        const imageFile = priceChangePercentage24h >= 0 ? require('./images/up_arrow.png') : require('./images/down_arrow.png');
        const marketCapFormatted = data.market_data.market_cap[selectedReferenceCurrencyCode].toLocaleString();
        const totalVolume = data.market_data.total_volume[selectedReferenceCurrencyCode].toLocaleString();
        const formattedDate = <Moment date={data.market_data.last_updated} />


        console.log(formattedDate)

        return(
            <div id="result">
                <div id="top-bar">
                    <div id="top-left-container" className="top-container">
                        <h1>{this.state.data.name} ({formattedSymbol})</h1>
                        <img id="icon" src={this.state.data.image.small}></img>
                        <h4>Market Cap Rank</h4>
                        <p>#{marketCapRank}</p>
                        <h4>All Time Low / All Time High</h4>
                        <p>{selectedReferenceCurrencySymbol}{this.state.data.market_data.atl[selectedReferenceCurrencyCode]} / {selectedReferenceCurrencySymbol}{this.state.data.market_data.ath[selectedReferenceCurrencyCode]}</p>
                    </div>
                    <div id="top-center-container" className="top-container">
                        <h1 id="current-price">{selectedReferenceCurrencySymbol}{currentPrice}</h1>
                        <h2 id="percentage-change" style={{color: (priceChangePercentage24h >= 0) ? 'green' : 'red'}}>{priceChangePercentage24h}% <img id="percentage-change-arrow" src={imageFile} style={{height: '10px'}} /></h2>
                        
                        <table id="currency-table">
                            <thead>
                                <tr>
                                    <th><button onClick={(e) => {
                                            e.target.style = {backgroundColor: 'red'}
                                            this.updateCurrency("aud")
                                        }}>AU$</button></th>
                                    <th><button onClick={() => {this.updateCurrency("usd")}}>US$</button></th>
                                    <th><button onClick={() => {this.updateCurrency("eur")}}>€</button></th>
                                    <th><button onClick={() => {this.updateCurrency("gbp")}}>GB£</button></th>
                                    <th><button onClick={() => {this.updateCurrency("nzd")}}>NZ$</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {this.setNumberCurrencyTable('aud')}
                                    {this.setNumberCurrencyTable('usd')}
                                    {this.setNumberCurrencyTable('eur')}
                                    {this.setNumberCurrencyTable('gbp')}
                                    {this.setNumberCurrencyTable('nzd')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="top-right-container" className="top-container">
                        <div id="refresh-div">
                            <p id="last-updated">Last Updated {formattedDate}</p>
                            <button onClick={() => {this.refresh()}}>Refresh Data</button>
                            <p id="data-refreshed">{this.state.isRefreshed ? "Data refreshed" : ""}</p>
                        </div>
                        <h4>Market Cap</h4>
                        <p>{selectedReferenceCurrencySymbol}{marketCapFormatted}</p>
                        <h4>24hr Volume</h4>
                        <p>{selectedReferenceCurrencySymbol}{totalVolume}</p>
                        <h4>24hr Low / 24hr High</h4>
                        <p>{selectedReferenceCurrencySymbol}{this.state.data.market_data.low_24h[selectedReferenceCurrencyCode]} / {selectedReferenceCurrencySymbol}{this.state.data.market_data.high_24h[selectedReferenceCurrencyCode]}</p>
                    </div>
                </div>

                <table id="percentage-comparison-table">
                    <thead>
                        <tr>
                            <th>Price Change Percentage</th>
                            <th>1h</th>
                            <th>24h</th>
                            <th>7d</th>
                            <th>14d</th>
                            <th>30d</th>
                            <th>60d</th>
                            <th>200d</th>
                            <th>1yr</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            {this.setNumberPercentageTable(data.market_data.price_change_percentage_1h_in_currency[selectedReferenceCurrencyCode])}
                            {this.setNumberPercentageTable(data.market_data.price_change_percentage_24h_in_currency[selectedReferenceCurrencyCode])}
                            {this.setNumberPercentageTable(data.market_data.price_change_percentage_7d_in_currency[selectedReferenceCurrencyCode])}
                            {this.setNumberPercentageTable(data.market_data.price_change_percentage_14d_in_currency[selectedReferenceCurrencyCode])}
                            {this.setNumberPercentageTable(data.market_data.price_change_percentage_30d_in_currency[selectedReferenceCurrencyCode])}
                            {this.setNumberPercentageTable(data.market_data.price_change_percentage_60d_in_currency[selectedReferenceCurrencyCode])}
                            {this.setNumberPercentageTable(data.market_data.price_change_percentage_200d_in_currency[selectedReferenceCurrencyCode])}
                            {this.setNumberPercentageTable(data.market_data.price_change_percentage_1y_in_currency[selectedReferenceCurrencyCode])}
                        </tr>
                    </tbody>
                </table>

                {this.createCurrencyButtons()}
                <div id="bottom-bar">

                    <table id="links-table">
                        <tbody>
                            {this.createLinks(this.state.blockchain_site, 'Blockchain Sites')}
                            {this.createLinks(this.state.announcement_url, 'Announcement Sites')}
                            {this.createLinks(this.state.chat_url, 'Chat Sites')}
                            {this.createLinks(this.state.homepage, 'Home Pages')}
                            {this.createLinks(this.state.official_forum_url, 'Official Forum Urls')}
                            {this.createLinks(this.state.repos_url.bitbucket, 'BitBucket Urls')}
                            {this.createLinks(this.state.repos_url.github, 'GitHub Urls')}
                        </tbody>
                    </table>

                    <p id="description" dangerouslySetInnerHTML={{__html: description}} />

                    
                </div>

            </div>
        )
    }

    render(){

        if (this.state.isLoading){
            return (<p>Loading...</p>);
        } else if (this.state.error !== null){
            return (<p>Cryptocurrency not found</p>);
        } else {
            return (this.renderResult())
        }
    }
}

export default CryptoDetails