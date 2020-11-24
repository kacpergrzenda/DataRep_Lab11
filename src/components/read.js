import React from 'react';
import { Movies } from './movies';
import axios from 'axios';

//Class "Read" inherits from react.component
export class Read extends React.Component {

    constructor(){
        super();
        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        movies: [

        ]
    }

    componentDidMount() {
        //get data url from server
        axios.get('http://localhost:4000/api/movies')
            //responds to url web and put data pulled from web in movie array
            .then(
                (response) => { this.setState({ movies: response.data }) }
            )
            //if error occurs log error to console
            .catch((error) => { console.log(error) });
    }

    ReloadData(){
        //get data url from server
        axios.get('http://localhost:4000/api/movies')
            //responds to url web and put data pulled from web in movie array
            .then(
                (response) => { this.setState({ movies: response.data }) }
            )
            //if error occurs log error to console
            .catch((error) => { console.log(error) });
    }

    render() {
        return (
            <div className="App">
                <h1>My Read in another component.</h1>
                <Movies movies={this.state.movies} ReloadData={this.ReloadData}></Movies>
            </div>
        );
    }
}//Read