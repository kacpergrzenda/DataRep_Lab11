const express = require('express')
const app = express()
const port = 4000 //server running on this domain
const cors = require('cors');
const bodyParser = require('body-parser');//import body parser
const mongoose = require('mongoose');//import mongoose
const path = require('path');//import path

app.use(cors());
//resource sharing with other domains
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//lines for configuration telling where the build & static folder is
app.use(express.static(path.join(__dirname, '../build')))
app.use('/static', express.static(path.join(__dirname, 'build//static')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

const myConnectionString = 'mongodb+srv://admin:kacper@cluster0.drcyc.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });//connect to your database

const Schema = mongoose.Schema;//define schema

var movieSchema = new Schema({//telling schema what your going to store
    title: String,
    year: String,
    poster: String
});

var MovieModel = mongoose.model("movie", movieSchema);

//request '/' and respond with Hello world
app.get('/', (req, res) => {
    res.send('Hello World!')
})
//request /api/movies' and respond with server data
app.get('/api/movies', (req, res) => {

    // const mymovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     }
    // ];

    MovieModel.find((err, data) => {
        res.json(data);
    })
})

//gets movie by id and than responds with object data
app.get('/api/movies/:id', (req, res) => {
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

app.put('/api/movies/:id', (req,res) => {
    console.log("Update movie "+ req.params.id);
    console.log(req.body);

    //its going to find a movie record by id and it is going to update it
    MovieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},
        (err,data) =>{
            res.send(data);
        })
})

//listen to server port end send this to client
app.post('/api/movies', (req, res) => {
    console.log('Movies Recieved');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);


    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    })

    res.send('Item Added');
})

//finds the movie by Id and deletes the movie by finding it by its id
app.delete('/api/movies/:id', (req, res) => {
    console.log("Delete Movie: " + req.params.id)

    MovieModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})

//for any root point send fild to this path
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

