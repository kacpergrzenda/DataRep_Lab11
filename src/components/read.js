import React from 'react';
import { Movies } from './movies';
import axios from 'axios';

//Class "Read" inherits from react.component
export class Read extends React.Component {

    state = {
        movies: [

        ]
    }

    componentDidMount() {
        //get data url from web
        axios.get('https://jsonblob.com/api/jsonblob/520c3b5e-0312-11eb-a6af-cbf00d776032')
            //responds to url web and put data pulled from web in movie array
            .then(
                (response) => { this.setState({ movies: response.data.Search }) }
            )
            //if error occurs log error to console
            .catch((error) => { console.log(error) });
    }

    render() {
        return (
            <div className="App">
                <h1>My Read in another component.</h1>
                <Movies movies={this.state.movies}></Movies>
            </div>
        );
    }
}//Read