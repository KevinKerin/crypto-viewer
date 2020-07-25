import React from 'react';

class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            href: props.href,
            name: props.name,
        }
    }

    render(){
        return(
            <button className="link-button"><a className="button-href" href={this.state.href}>{this.state.name}</a></button>
        )
    }

}

export default Button