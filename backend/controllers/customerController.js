const Customer=require('../models/customer');

exports.getAllCustomers=async (req,res)=>{
    try{
        const customers=await Customer.find();
        res.json(customers);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

exports.getCustomerById=async (req,res)=>{
    try{
        const{id}=req.params
        const customer=await Customer.findById(id);
        if(!customer){
            return res.status(404).json({message:"Customer not found"});
        }
        res.json(customer);

    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.createCustomer=async (req,res)=>{ 
    try {
        const {name,email,mobileNumber,city,password}=req.body;
        const existingCustomer=await Customer.findOne({email});
        if(existingCustomer){
            return res.status(400).json({message:"User already exists"});
        }
        const newCustomer=new Customer({
            name,
            email,
            mobileNumber,
            city
        });
        const savedCustomer=await newCustomer.save();
        res.status(201).json(savedCustomer);

    } catch (error) {
        res.status(400).json({message:error.message});
    }
 }

 
exports.updateCustomer = async (req, res) => {
    try {
        const { name, email, mobileNumber, city } = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, email, mobileNumber, city },
            { new: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  