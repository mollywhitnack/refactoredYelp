'use strict';

const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const fs = require('fs');
const uuid = require('uuid');

const Image = require('../models/image');

//middlewear to accept files we send up
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 52428800}
});

let router = express.Router();

let urlBase = 'https://s3.amazonaws.com';
let bucketName = 'MollyWhitnackBucket';

router.post('/', upload.single('photo'), (req, res)=>{
    Image.upload(req.file, req.body, (err, url)=>{
        res.status(err ? 400 :200).send(err || url);
    })
})

router.get('/', (req, res)=>{
  Image.find({}, (err, images)=>{
    res.status(err ? 400 : 200).send(err || images);
  })
})

router.route('/:id')
 .get((req, res) =>{
  Image.findById(req.params.id, (err, image) =>{
     res.status(err ? 400 : 200).send(err || image);
    });
})

router.route('/user/:id')
 .get((req, res) =>{
  Image.find({user: req.params.id}, (err, image) =>{
     res.status(err ? 400 : 200).send(err || image);
    });
  })

module.exports = router;



