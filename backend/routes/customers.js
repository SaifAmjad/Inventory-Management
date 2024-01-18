const express=require('express');
const { getCustomers, createCustomer, editCustomers, deleteCustomer } = require('../controllers/customers');
const router=express.Router();

router.get('/',getCustomers);
router.post('/',createCustomer);
router.put('/:id',editCustomers);
router.delete('/:id',deleteCustomer)

module.exports=router;