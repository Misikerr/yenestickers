import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, removeOrder} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/remove',adminAuth,removeOrder)

// Payment Features
// Accepts multipart/form-data with a single file field named 'screenshot'
orderRouter.post('/place',authUser, upload.single('screenshot'), placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/razorpay',authUser, placeOrderRazorpay)

// User Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter