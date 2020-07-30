import React from 'react';
import './Crypto.css';
import {Switch, Link, Route} from 'react-router-dom';

function Crypto(props){

    console.log(props);

    return (
        <tr>
                <td>{props.item.market_cap_rank}</td>
                <td><img style={{height: '25px'}} src={props.item.image}></img></td>
                <td style={{textAlign: 'left'}}><Link to={`/crypto/${props.item.id}`}>{props.item.name}</Link></td>
                <td>{props.item.symbol.toUpperCase()}</td>
                <td>${props.item.current_price.toLocaleString()}</td>
                <td>${props.item.market_cap.toLocaleString()}</td>
                <td style={{color: (props.item.price_change_percentage_24h >= 0) ? 'green' : 'red'}}>{props.item.price_change_percentage_24h}%</td>
                <td style={{color: (props.item.high_24h == props.item.current_price) ? 'purple' : 'white'}}>${props.item.high_24h}</td>
        </tr>
    )

}

// class Crypto extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             id : this.props.item.id,
//             item : this.props.item,
//             rank : this.props.item.market_cap_rank,
//             name : this.props.item.name,
//             image : this.props.item.image,
//             currentPrice : this.props.item.current_price,
//             marketCap : this.props.item.market_cap.toLocaleString(),
//             symbol : this.props.item.symbol.toUpperCase(),
//             priceChangePercentage24h : (Math.round(this.props.item.price_change_percentage_24h * 100) / 100).toFixed(2),
//             high24h: this.props.item.high_24h
//         }
//     }

//     render(){
//         return (
//             <tr>
//                 <td>{this.state.rank}</td>
//                 <td><img style={{height: '25px'}} src={this.state.image}></img></td>
//                 <td style={{textAlign: 'left'}}><Link to={`/crypto/${this.state.id}`}>{this.state.name}</Link></td>
//                 <td>{this.state.symbol}</td>
//                 <td>${this.state.currentPrice}</td>
//                 <td>${this.state.marketCap}</td>
//                 <td style={{color: (this.state.priceChangePercentage24h >= 0) ? 'green' : 'red'}}>{this.state.priceChangePercentage24h}%</td>
//                 <td style={{color: (this.state.high24h == this.state.currentPrice) ? 'purple' : 'white'}}>${this.state.high24h}</td>
//             </tr>
//         )
//     }
// }

export default Crypto