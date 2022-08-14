const express = require('express');
const app = express();
require('./db/Config');
require("dotenv").config();
const port = process.env.PORT || 5000;
const productRoutes = require('./api/Products');
const path = require('path');
app.use('/', productRoutes);
const userRoutes = require('./api/Users');
app.use('/', userRoutes);

// Server deployment //
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, resp) => {
        resp.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });    
}
//
app.listen(port, () => {
    console.log(`Application is listening on port ${port}!`)
});