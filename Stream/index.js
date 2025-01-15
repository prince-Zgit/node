// we will stream the file, nothing keeping in memory
// data reading and sending to client as chunk
// browser will receive data in chunk so broswer don't know length of stream
// Both Writable and Readable streams will store data in an internal buffer

const express = require('express');
const fs = require('fs');
const status = require('express-status-monitor')

const app = express();
const port = 8000;

app.use(status());


app.get('/', (req, res)=>{
    // fs.readFile('./text.txt', (err, data)=>{
    //     res.end(data)
    // })
    const stream = fs.createReadStream('./text.txt', 'utf-8');
    stream.on('data', (chunk)=> res.write(chunk));
    stream.on('end', ()=> res.end());
})
app.listen(port, ()=>{
    console.log('server started: '+ port )
})