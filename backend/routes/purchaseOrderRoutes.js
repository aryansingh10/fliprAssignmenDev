const express=require('express');
const router=express.Router();
const purchaseOrderController=require('../controllers/purchaseOrderController.js');
// const { verify } = require('jsonwebtoken');
const verifyUser = require('../middlewares/verifyUser.js');

// Get all purchase orders
router.get('/',purchaseOrderController.findAllPurchaseOrders)

// Get purchase order by ID
router.get('/:id',verifyUser,purchaseOrderController.findPurchaseOrderById)

// Create a new purchase order
router.post('/',verifyUser,purchaseOrderController.createPurchaseOrder)

// Update purchase order by ID
router.put('/:id', verifyUser,purchaseOrderController.updatePurchaseOrder)

router.delete('/:id',verifyUser,purchaseOrderController.deletePurchaseOrder)

module.exports=router;
