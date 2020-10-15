import React from 'react';
import '../App.css';

//Class "Header" inherits from react.component
export class Header extends React.Component{

    render(){
        return(
            <div className="App">
                <h1>My Header in another component.</h1>
            </div>
        );
    }
}//Header