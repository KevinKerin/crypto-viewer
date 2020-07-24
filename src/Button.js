import React from 'react';

class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            href: props.href,
            name: props.name,
            hrefLength: props.hrefLength
        }
    }

    render(){
        // if(this.state.hrefLength > 20){
        //     return(
        //         <button className="link-button"><a className="button-href" href={this.state.href} fontSize="1px">{this.state.name}</a></button>
        //     )
        // }
        return(
            <button className="link-button"><a className="button-href" href={this.state.href}>{this.state.name}</a></button>
        )
    }

}

export default Button