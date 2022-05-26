const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection = require('./db');
const app = express();
const port = 8000;




app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.json());
app.get('/getdata/:id', (req, res) => {
    console.log("retreived......", req.params.id);
    var object = {
        selector: {

            "email": req.params.id
        }
    }
    dbconnection.fresher.find(object).then((data => {
        console.log("firstname", data);
        res.json(data);

    }))
})
app.post('/postdata', function(req, res) {
    var name = req.body.firstName;
    console.log(name);
    var objectnew = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.mobile,
    }
    console.log("data from angular....", objectnew);
    dbconnection.fresher.insert(objectnew).then((data) => {
        console.log("Data inserted Successfully", data);
    });
});


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
})