import React from 'react';

class CurrencyDropdown extends React.Component {

    constructor(props){
        super(props);
        console.log(props.currencyList)
        let currencyButtonList = [];
        for (let currency of props.currencyList) {
            currencyButtonList.push(<button key={currency}>{currency.toUpperCase()}</button>);
        }
        this.state = {
            menuIsVisible: true,
            currencyButtonList: currencyButtonList
        }
        console.log("--------")
        console.log(this.state.currencyButtonList)
    }

    createButtons(currencyList){
        
    }

    render(){
        console.log(this.state)
        console.log(this.state.currencyButtonList.length)
        return (
            <div>
                <button>Choose currency</button>
                {this.state.menuIsVisible ? <h1>{}</h1> : <h1>Not Visible</h1>}
            </div>
        )
    }

}

export default CurrencyDropdown