const https = require('https');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const mysql = require('mysql');
const bodyParser = require("body-parser");
require('dotenv/config');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))
const storage = multer.memoryStorage({
    destination: function(req, file, cb) {
        cb(null, '');
    }
});
function isTeacher(req, res, next){
    if(req.user[0].user_id!=null)
    {
      if((req.user[0].user_role=='teacher' && req.user[0].approved==1 ) || req.user[0].user_role=='admin' )
      {
       next();
      }
      else if(req.user[0].user_role!='student' || (req.user[0].user_role=='teacher' && req.user[0].approved!=1 )  )
      {
        res.redirect('/teacher/approval');
      }
    }
  }
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    region: process.AWS_REGION,
    endpoint: "https://s3.us-east-2.amazonaws.com/examstudytool-s3"
});


router.post('/imageUpload',isTeacher, upload.single('image'), (req, res) => {
    console.log(req);
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: 'public-read-write',
        ContentType: 'image/jpeg'
    };

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send({ 'err': error });
        } else {
            const productImage = data.Location;
            res.status(200).send({ productImage });
        }
    });
});

module.exports = s3;
module.exports = router;