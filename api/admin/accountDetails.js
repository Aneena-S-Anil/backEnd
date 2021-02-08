require("dotenv").config();

const express = require("express");
const router = express.Router();

const multer = require("multer");

const AWS = require("aws-sdk");

const uuid = require("uuid/v4");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("image");

router.post("/accountDetails", upload, (req, res) => {
    let testData = req.file.originalname.split(".");
  
    const fileType = testData[testData.length - 1];
  
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid()}.${fileType}`,
      Body: req.file.buffer,
    };
  
    s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send(error);
      }  
      res.status(200).send(data);
    });
  });

  module.exports = router;                                         