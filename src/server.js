const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();

const videoRoutes = require('./routes/Video');

app.use(cors());
app.use(videoRoutes);

app.post('/upload', (req, res) => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, `${__dirname}/public`)
        },
        filename: function(req, file, cb){
            cb(null, Date.now() + '.mp4')
        }
    });

    const upload = multer({storage}).single('file');

    upload(req, res, function(err) {
        if(err instanceof multer.MulterError){
            return res.status(500).send(err);
        }else if (err){
            return res.status(500).send(err);
        }

        const filename = req.file.filename;

        res.status(201).send({
            idServer: filename.replace('.mp4', ''),
            filename
        })
    })
});

app.get('/teste', (req, res) => {
    res.status(200).send({ok: true})
})

app.listen(5000, () => {
    console.log('Listening on port 5000!')
});