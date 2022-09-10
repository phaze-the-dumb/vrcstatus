const express = require('express');
const { Client } = require('node-osc');
const fs = require('fs');
const app = express();
let config = JSON.parse(fs.readFileSync('config.json'));

const client = new Client('127.0.0.1', 9000);

app.get('/apps', (req, res) => {
    res.sendFile(__dirname + '/apps.html');
})

app.use('/open', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE')
    next();
})

app.get('/open/config.json', (req, res) => {
    res.json(config);
})

app.delete('/open/apps', (req, res) => {
    let text = '';

    req.on('data', ( chunk ) => text += chunk.toString());
    req.on('end', () => {
        config.enabledApps = config.enabledApps.filter(x => x !== text);
        fs.writeFileSync('config.json', JSON.stringify(config));

        res.send('OK');
    })
})

app.put('/open/apps', (req, res) => {
    let text = '';

    req.on('data', ( chunk ) => text += chunk.toString());
    req.on('end', () => {
        config.enabledApps.push(text);
        fs.writeFileSync('config.json', JSON.stringify(config));

        res.send('OK');
    })
})

app.put('/open/status.json', (req, res) => {
    let text = '';

    req.on('data', ( chunk ) => text += chunk.toString());
    req.on('end', () => {
        client.send('/chatbox/input', [ text, true ], () => {
            console.log(text);
            res.send('OK');
        });
    })
})

app.listen(8076);