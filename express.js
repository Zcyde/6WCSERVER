// PINEDA, Eldrin Josh P.
// WD-302

import express from 'express';
import bodyParser from "body-parser";
import multer from 'multer';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static('public'));
const urlEncoderParser = bodyParser.urlencoded({extended: false});

// Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html')
});

app.get('/userPage', (req, res) => {
    res.sendFile(__dirname + '/pages/user.html');
})

app.get('/getUser', (req, res) => {
    var response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    }

    console.log("Respone is: ", response);
    res.end(`Recieved Data: " ${JSON.stringify(response)}`);
})

// Server listing
const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log ("Server running at http://%s:%s", host, port);
    console.log("Server running at http://" + host + ":" + port);
    console.log(`Server running at http://${host}:${port}`);
})

// Student page
// GET
app.get('/getStudent', (req, res) => {
    var response = {
        studentID: req.query.studentID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section,
    }
    
    console.log("Response is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
})

// POST
app.post('/postStudent', urlEncoderParser, (req, res) => {
    var response = {
        studentID: req.body.studentID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        section: req.body.section,
    }
    
    console.log("Response is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
})

// Admin page
// GET
app.get('/getAdmin', (req, res) => {
    var response = {
        adminID: req.query.adminID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        department: req.query.department,
    }

    console.log("Response is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
    
})

// POST
app.post('/postAdmin', urlEncoderParser, (req, res) => {
    var response = {
        adminID: req.body.adminID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
    }
    
    console.log("Response is: ", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
})

// Upload form for Admin page
// Multer Storage
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, 'pages', 'uploads'));
    }, 
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

var uploads = multer({storage: storage}).fields([{name: 'file', maxCount: 1}]);

app.post('/uploads', (req, res) => {
    uploads(req, res, (err) => {
        if (err) return res.end('Error uploading file');

        const uploadedFile = req.files['file'][0];
        const response = {
            adminID: req.body.adminID,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
        }
        console.log(`Admin ID: ${response.adminID}\nFirst Name: ${response.firstName}\nLast Name: ${response.lastName}\nDepartment: ${response.department}`);
        console.log(`File path ${uploadedFile.path}`);

        res.end('File and Form data uploaded successfully');
    })
})


// Page Routes
// Student
app.get('/studentPage', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html');
})

// Admin
app.get('/adminPage', (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html');
})
