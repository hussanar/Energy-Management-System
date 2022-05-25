const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection = require('./db');
const app = express();
const port = 8000;
// const nodemail = require('nodemailer');
// const setmail = require('./mail')


// app.get('/getdata/:id', function (request, response) {
//     response.json({ "name": "venkat" });
// });

app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.json());
app.get('/getdata/:id', (req, res) => {
    console.log("retreived......", req.params.id);

    //all data retrieved

    // const doc = dbconnection.trainee.list().then(body => {
    //     body.rows.forEach((doc) => {
    //         console.log(doc);
    //     })
    // })

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
        location: req.body.location,
        mobile: req.body.mobile,
    }
    console.log("data from angular....", objectnew);
    dbconnection.fresher.insert(objectnew).then((data) => {
        console.log("Data inserted Successfully", data);
    });
});
app.post('/mail', (request, response, next) => {

    var object = {
        firstname: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,

    }
    setmail.getemail(object);
    console.log(object);
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`server is listening on http://localhost:${port}`);
})