import React from 'react';
import './Crypto.css';
import {Switch, Link, Route} from 'react-router-dom';

function Crypto(props){

    return (
        <tr>
                <td>{props.item.market_cap_rank}</td>
                <td><img style={{height: '25px'}} src={props.item.image}></img></td>
                <td style={{textAlign: 'left'}}><Link to={`/crypto/${props.item.id}`}>{props.item.name}</Link></td>
                <td>{props.item.symbol.toUpperCase()}</td>
                <td>{props.currencySymbol}{props.item.current_price.toLocaleString()}</td>
                <td>{props.currencySymbol}{props.item.market_cap.toLocaleString()}</td>
                <td style={{color: (props.item.price_change_percentage_24h >= 0) ? 'green' : 'red'}}>{props.item.price_change_percentage_24h}%</td>
                <td style={{color: (props.item.high_24h == props.item.current_price) ? 'purple' : 'white'}}>${props.item.high_24h}</td>
        </tr>
    )

}

export default Crypto