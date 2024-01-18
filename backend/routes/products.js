const express=require('express');
const { getProducts, postProducts, editProducts,deleteProduct } = require('../controllers/products');
const router=express.Router();


router.get('/',getProducts);
router.post('/',postProducts);
router.put('/',editProducts);
router.delete('/',deleteProduct)
module.exports=router