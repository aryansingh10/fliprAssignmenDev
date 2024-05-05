const PurchaseOrder = require('../models/purchaseOrder');
const Customer = require('../models/customer');

exports.findAllPurchaseOrders =  async (req, res) => {
    try {
        const purchaseOrders = await  PurchaseOrder.find();
        res.json(purchaseOrders);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

exports.findPurchaseOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchaseOrder = await PurchaseOrder.findById(id);
        if (!purchaseOrder) {
            return res.status(404).json({ message: "Purchase order not found" });
        }
        res.json(purchaseOrder);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.createPurchaseOrder = async (req, res) => {
    try {
        
        const { productName, quantity, pricing, mrp, customerId } = req.body;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const newPurchaseOrder = new PurchaseOrder({
            productName,
            quantity,
            pricing,
            mrp,
         customerId:customer._id 
        });
        const savedPurchaseOrder = await newPurchaseOrder.save();
        res.status(201).json(savedPurchaseOrder);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.updatePurchaseOrder = async (req, res) => {
    try {
        const { productName, quantity, pricing, mrp, customerId } = req.body;
        const {id}=req.params;
        const updatedPurchaseOrder=await PurchaseOrder.findByIdAndUpdate(id ,{productName,quantity,pricing,mrp,customerId},{new:true})
        if (!updatedPurchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }
        res.json(updatedPurchaseOrder);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
}

exports.deletePurchaseOrder = async (req, res) => {
    try{
        const {id}=req.params;
        const deletedPurchaseOrder=await PurchaseOrder.findByIdAndDelete(id);
        if(!deletedPurchaseOrder){
            return res.status(404).json({message:"Purchase order not found"});
        }
        res.json(deletedPurchaseOrder);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}
