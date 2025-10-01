import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'

// Placing orders using COD / Mobile Wallet with optional screenshot proof
const placeOrder = async (req,res) => {
    
    try {
        // When using multipart/form-data, structured fields come as strings.
        // Frontend sends: screenshot (file), address (JSON), items (JSON), amount (string), paymentMethod (string)
        // Resolve userId: prefer token header, fallback to body
        let { userId } = req.body;
        if (!userId && req.headers && req.headers.token) {
            try {
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
                if (decoded && decoded.id) {
                    userId = decoded.id;
                }
            } catch (_) {
                // ignore token errors, will fail below if userId missing
            }
        }
        if (!userId) {
            return res.json({ success: false, message: 'Not authorized: userId missing' });
        }
        const items = typeof req.body.items === 'string' ? JSON.parse(req.body.items) : req.body.items;
        const address = typeof req.body.address === 'string' ? JSON.parse(req.body.address) : req.body.address;
        const amount = Number(req.body.amount);
        const paymentMethod = req.body.paymentMethod || 'COD';

        let proofUrl = '';
        if (req.file && req.file.path){
            const uploaded = await cloudinary.uploader.upload(req.file.path,{resource_type:'image'});
            proofUrl = uploaded.secure_url;
        }

        const orderData = {
            userId,
            items,
            address: { ...(address || {}), paymentProofUrl: proofUrl },
            amount,
            paymentMethod,
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {

}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req,res) => {

}

// All Orders data for Admin Panel
const allOrders = async (req,res) => {
    
    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
    }
}

// User Order data for Frontend
const userOrders = async (req,res) => {
    try {
        

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.json({ success: false, message: "orderId and status are required" });
        }

        const updated = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updated) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Status updated", order: updated });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Remove an order (admin only)
const removeOrder = async (req,res) => {
    try {
        const { orderId } = req.body;
        if (!orderId){
            return res.json({ success:false, message:'orderId required' });
        }
        const removed = await orderModel.findByIdAndDelete(orderId);
        if (!removed){
            return res.json({ success:false, message:'Order not found' });
        }
        return res.json({ success:true, message:'Order removed' });
    } catch (error) {
        console.log(error);
        return res.json({ success:false, message:error.message });
    }
}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, removeOrder}