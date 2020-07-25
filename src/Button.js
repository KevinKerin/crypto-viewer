import React from 'react';

class Button extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            href: props.href,
            name: props.name,
<<<<<<< HEAD
=======
            hrefLength: props.hrefLength
>>>>>>> 287f3ae4f9d02ead61da0f41d339f66a2eacaf54
        }
    }

    render(){
<<<<<<< HEAD
=======
        // if(this.state.hrefLength > 20){
        //     return(
        //         <button className="link-button"><a className="button-href" href={this.state.href} fontSize="1px">{this.state.name}</a></button>
        //     )
        // }
>>>>>>> 287f3ae4f9d02ead61da0f41d339f66a2eacaf54
        return(
            <button className="link-button"><a className="button-href" href={this.state.href}>{this.state.name}</a></button>
        )
    }

}

export default Button