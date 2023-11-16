const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const videoRoutes = require('./routes/Video');

app.use(cors());
app.use(videoRoutes);

app.listen(5000, () => {
    console.log('Listening on port 5000!')
});