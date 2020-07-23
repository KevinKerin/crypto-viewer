import React from 'react';
import './CryptoDetails.css';
import Button from './Button';
import {Switch, Link, Route} from 'react-router-dom';

class CryptoDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: null,
            id: this.props.match.params._id,
            item : this.props.item,
            symbol: null,
            description: null,
            error: null,
            fiatCurrency: 'usd',
            currencySymbol: '$',
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
            // description: null
            // rank : this.props.item.market_cap_rank,
            // name : this.props.item.name,
            // image : this.props.item.image,
            // currentPrice : this.props.item.current_price,
            // marketCap : this.props.item.market_cap.toLocaleString(),
            // symbol : this.props.item.symbol.toUpperCase(),
            // priceChangePercentage24h : (Math.round(this.props.item.price_change_percentage_24h * 100) / 100).toFixed(2),
            // high24h: this.props.item.high_24h
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
        <div>
            <p>{websiteListHeading}</p>
            {this.createButtons(websiteArray)}
        </div>)
    }

    createButtons(websiteArray){
        const buttonList = websiteArray.map(website => {
            if(website !== null && website.length > 0){
                let firstChar = website.indexOf('://') + 3;
                let websiteName = website.substring(firstChar);
                let lastChar = website.indexOf('/', firstChar);
                if(lastChar !== -1){
                    websiteName = website.substring(firstChar, lastChar);
                }
                if(websiteName.startsWith('www.')){
                    websiteName = websiteName.substring(4);
                }
                console.log(website)
                return (<Button key={website} href={website} name={websiteName}/>);
            }
        })
        return buttonList;
    }

    renderResult(){

        const currentPrice = this.state.data.market_data.current_price[this.state.fiatCurrency]
        const formattedSymbol = this.state.data.symbol.toUpperCase();
        const priceChangePercentage24h = (Math.round(this.state.data.market_data.price_change_percentage_24h * 100) / 100).toFixed(2);
        const imageFile = priceChangePercentage24h >= 0 ? require('./images/up_arrow.png') : require('./images/down_arrow.png');
        const marketCapFormatted = this.state.data.market_data.market_cap[this.state.fiatCurrency].toLocaleString();
        const totalVolume = this.state.data.market_data.total_volume[this.state.fiatCurrency].toLocaleString();

        // let announcementUrls = this.createButtons(this.state.announcement_url);
        // let blockchainSites = this.createButtons(this.state.blockchain_site);
        // let chatUrls = this.createButtons(this.state.chat_url);
        // let homepages = this.createButtons(this.state.homepage);
        // let officialForumUrls = this.createButtons(this.state.official_forum_url);
        // let bitbucketUrls = this.createButtons(this.state.repos_url.bitbucket);
        // let githubUrls = this.createButtons(this.state.repos_url.github);

        return(
            <div id="result">
                <div id="top-bar">
                    <div id="top-left-container" className="top-container">
                        <h1>{this.state.data.name} ({formattedSymbol})</h1>
                        <img id="icon" src={this.state.data.image.small}></img>
                    </div>
                    <div id="top-center-container" className="top-container">
                        <h1 id="current-price">{this.state.currencySymbol}{currentPrice}</h1>
                        <h2 id="percentage-change" style={{color: (priceChangePercentage24h >= 0) ? 'green' : 'red'}}>{priceChangePercentage24h}% <img id="percentage-change-arrow" src={imageFile} style={{height: '10px'}} /></h2>
                    </div>
                    <div id="top-right-container" className="top-container">
                        <h4>Market Cap</h4>
                        <p>{this.state.currencySymbol}{marketCapFormatted}</p>
                        <h4>24hr Volume</h4>
                        <p>{this.state.currencySymbol}{totalVolume}</p>
                        <h4>24hr Low / 24hr High</h4>
                        <p>{this.state.currencySymbol}{this.state.data.market_data.high_24h[this.state.fiatCurrency]} / {this.state.currencySymbol}{this.state.data.market_data.low_24h[this.state.fiatCurrency]}</p>
                    </div>
                </div>
                <div id="link-details-div">
                    {this.createLinks(this.state.blockchain_site, 'Blockchain Sites')}
                    {this.createLinks(this.state.announcement_url, 'Announcement Sites')}
                    {this.createLinks(this.state.chat_url, 'Chat Sites')}
                    {this.createLinks(this.state.homepage, 'Home Pages')}
                    {this.createLinks(this.state.official_forum_url, 'Official Forum Urls')}
                    {this.createLinks(this.state.repos_url.bitbucket, 'BitBucket Urls')}
                    {this.createLinks(this.state.repos_url.github, 'GitHub Urls')}
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