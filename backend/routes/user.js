const express=require('express');
const { login, authenticate } = require('../controllers/user');
const router=express();


router.post('/',login);
router.get('/',authenticate);

module.exports=router;