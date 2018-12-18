

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' );
mongoose.connect('mongodb://localhost:27017/myapp');


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('public'));
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html')
// });


// Not found middleware


app.use(require('./controllers/exerciseTrackerCon'));


// Error Handling middleware
app.use((err, req, res, next) => {
    let errCode, errMessage;

    if (err.errors) {
        // mongoose validation error
        errCode = 400 ;// bad request
        const keys = Object.keys(err.errors);
        // report the first validation error
        errMessage = err.errors[keys[0]].message
    } else {
        // generic or custom error
        errCode = err.status || 500;
        errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
        .send(errMessage)
});


// const listener = app.listen(process.env.PORT || 3000, () => {
//     console.log('Your app is listening on port ' + listener.address().port)
// });
app.use((req, res, next) => {
    return next({status: 404, message: 'not found'})
});

const listener = app.listen(3003, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
