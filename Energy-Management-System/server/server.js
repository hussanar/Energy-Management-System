const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection = require('./db');
const app = express();
const port = 8000;

app.get('/getdata/:id', function(request, response) {
    response.json({ "name": "hussanar" });
});

app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.json());

var object = {
    selector: {
        "firstname": "hussanar",
    }

    // dbconnection.fresher.find(object).then((data => {
    //         for (i = 0; i < data.docs.length; i++) {
    //             console.log("data", data);
    //         }
    //     }))
}


app.post('/postdata', function(req, res) {
    var name = req.body.firstName;
    console.log(name);
    var objectnew = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
    }
    console.log("data from angular....", objectnew);
    dbconnection.fresher.insert(objectnew).then((data) => {
        console.log("Data inserted Successfully", data);
    });
});

app.get('/getdata/:id', (req, res) => {
    console.log("retreived......", req.params.id);
    var object = {
        selector: {
            "email": req.params.id
        }
    }
    dbconnection.trainee.find(object).then((data => {
        console.log("firstname", data);
        res.json(data);
    }))
})
app.get('/get_query', (request, response) => {
    console.log('start');
    dbconnection.get('energy-management-login').then((res) => {
        if (res) {
            response.send(res);
        } else {
            response.send('error');
        }
    });
});
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`)
});