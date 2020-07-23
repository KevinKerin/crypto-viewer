import React from 'react';

import {Switch, Link, Route} from 'react-router-dom';

class CryptoDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            // isLoading: true,
            data: null,
            id: this.props.match.params._id,
            item : this.props.item,
            symbol: null,
            description: null
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
        this.setState({isLoading: true})
        fetch(`https://api.coingecko.com/api/v3/coins/${this.state.id}`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    data: response,
                    symbol: response.symbol,
                    description: response.description.en
                    // isLoading: false,
                    // description: response.description
                })
                console.log(this.state.data)
                console.log(response)
                console.log(this.state.symbol)
            })
    }

    render(){
        return (
            <div>
                <h1>{this.state.description}</h1>
                {/* <p>{this.state.description}</p> */}
            </div>
        )
    }
}

export default CryptoDetails