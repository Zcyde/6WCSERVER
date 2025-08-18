import express from 'express';
import multer from 'multer';

import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
// Storage
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'example/');
    }, 
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

var example = multer({storage: storage}).fields([{name: 'file', maxCount: 1}]);

// Open form on index(/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'exampleForm.html'));
});

app.post('/example', (req, res) => {
    example(req, res, (err) => {
        if (err) return res.end('Error uploading file');
        
        const username = req.body.username;

        const uploadedFile = req.files['file'][0];

        console.log(`Username ${username}`);
        console.log(`File path ${uploadedFile.path}`);

        res.end('File and form data uploadded successfully');
    });
});

var server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Server running at http://%s:%s/", host, port);
})