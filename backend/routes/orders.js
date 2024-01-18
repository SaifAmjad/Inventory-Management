const express=require('express');
const { getOrders, postOrders, orderComplete, postComplete, deleteOrders } = require('../controllers/orders');
const router=express.Router();

router.get('/',getOrders);
router.post('/',postOrders);
router.delete('/',deleteOrders);
router.get('/completed',orderComplete);
router.post('/completed',postComplete);

module.exports=router;