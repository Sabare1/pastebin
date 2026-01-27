const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;



app.get('/api/healthz', (req, res) => {     //entry check
    res.status(200).json({
        "ok": true
    });
})


app.post('/api/pastes', (req, res) => {     // create paste
    res.status(201).json({
        success: true,
        message: "Created paste successfully"
    })
})

app.get('/api/pastes/:id', (req, res) => {       // get paste (API)
    res.status(200).json({
        success: true, 
        message: "paste content"
    })
})

app.get('/p/:id', (req, res) => {              //get paste(HTML)
    res.status(200).json({
        success: true,
        message: "HTML"
    })
})


app.listen(port, ()=> {
    console.log(`Server is listening on the port ${port}...`);
});