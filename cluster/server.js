// cluster use for load balancing in node.js
// cluster creates multiple instance of node.js which handle request and response in round robin



const cluster = require('cluster');
const os = require('os');
const express = require('express');
const process = require('process');

const totalCpu = os.cpus().length;

console.log(totalCpu);
console.log(cluster)

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    //create cluster
    for (let i = 0; i < totalCpu; i++) {
        cluster.fork().on('error', (error) => {
            console.error(`Worker fork error: ${error.message}`);
          });
    }
} else {
    const app = express();
    const port = 7000;

    app.get('/', (req, res) => {
        return res.json({ message: `Hello from express server` })
    });

    app.listen(port, () => {
        console.log(`app started on port: ${port}`)
    })
}