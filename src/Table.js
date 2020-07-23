import React from 'react';
import Crypto from './Crypto';

class Table extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cryptoList: this.props.cryptoData.map(item => <Crypto key={item.id} item={item}/>)
        }
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