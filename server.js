import http from 'http';
import EventEmitter from 'events';
// const http = require('http');
// const EventEmiiter = require('events');
const eventEmitter = new EventEmiiter();

const requestHandler = (req, res) => {
    if (req.url === '/') {
        eventEmiiter.emit('HomePageEvent', res);
    } else {
        res.written(400, {'content-type': 'text/plain'});
        res.write('page not found');
        res.end();
    }
}

eventEmittier.on('HomePageEvent'), (res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('<html><body><h1>Homepage</h1></body></html>');
    res.end();
}

eventEmittier.on('HomePageEvent'), (res) => {
    console.log("Homepage loaded");
}

eventEmittier.on('HomePageEvent'), (res) => {
    console.log("Visited Homepage from IP", req.socket.remoteAccess);
}
var server = http.createServer(requestHandler);

server.listen(5000);
console.log('Server running at httpL//locathost:5000');