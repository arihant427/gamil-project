const express = require('express');
const gmail = require('../config/gmail');
const router = express.Router();
router.get("/list", (req, res, next) => {
  gmail.getList(req,res,function(data){
       res.status(200).send(data)
  });
});

router.get("/get/message", (req, res, next) => {
    gmail.getMessageData(req,res,function(data){
        res.status(200).send(data)
   });
});

module.exports = router;