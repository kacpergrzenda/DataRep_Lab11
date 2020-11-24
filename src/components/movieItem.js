import Button from 'react-bootstrap/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export class MovieItem extends React.Component {

    constructor(){
        super();

        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie(e){
        e.preventDefault();//Make sure it doesnt delete automatically
        console.log("Delete: " + this.props.movie._id);

        //calling Localhost 4000 to delete
        axios.delete("http://localhost:4000/api/movies/" +this.props.movie._id)
        .then(()=>{
            this.props.ReloadData();//call reload data on movie.js to update list
        })
        .catch();
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.movie.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.poster} width="200" height="200"></img>
                            <footer className="blockquote-footer">
                                {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Button variant="danger" onClick={this.DeleteMovie} >Delete</Button> 
                </Card>
            </div>
        );
    }
}