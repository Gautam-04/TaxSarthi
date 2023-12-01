const express = require('express');
const router = express.Router();
const OldReignController = require('../controllers/OldReignController');

router.post("/oldreign", OldReignController.Old);

router.get("/oldreign",(req,res)=>{
res.send("It is working");
});

module.exports = router;