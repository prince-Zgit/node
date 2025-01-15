const express = require('express');

const app = express();
const port = 7200;



app.get('/', (req, res)=>{
    return res.json({ message : `Hello from express server`})
});


app.listen(port, ()=>{
    console.log(`app started on port: ${port}`)
})


