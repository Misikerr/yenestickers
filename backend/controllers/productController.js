import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";

// Function for adding a product
const addProduct = async (req, res) => {
    try {
        const { name, description, category } = req.body;

        const image1 = req.files.image1 &&  req.files.image1[0];
        const image2 = req.files.image2 &&  req.files.image2[0];
        const image3 = req.files.image3 &&  req.files.image3[0];
        const image4 = req.files.image4 &&  req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        
        // Hardcoded pricing and sizes based on category (no subCategory used)
        let price = 40;
        let sizes = [];
        if (category === 'LaptopSkin'){
            sizes = ['13"','14"','15"'];
            price = 500;
        } else {
            sizes = ['Tiny','Small','Large'];
            // Pricing for stickers is derived in frontend per size; store a base price
            price = 40;
        }

        const productData = {
            name,
            description,
            category,
            sizes,
            price,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({success: true,message:"Product Added"});

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

// Function for list product
const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

// Function for removing a product
const removeProduct = async (req, res) => {

    try {
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product Removed"});

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

// Function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId);
        res.json({success:true,product});
        
    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

// Price helpers (Sticker constants and discount tiers)
const getStickerUnitPrice = (size) => {
    switch(size){
        case 'Tiny': return 35;
        case 'Small': return 40;
        case 'Large': return 45;
        default: return 40;
    }
}

const getStickerDiscountPercent = (size, totalCount) => {
    if (totalCount >= 10){
        if (size === 'Small') return 15;
        return 20;
    }
    if (totalCount >= 5){
        if (size === 'Small') return 7.5;
        return 10;
    }
    return 0;
}

// Compute cart pricing server-side given cartItems and current products
const priceCart = async (req, res) => {
    try {
        const { cartItems } = req.body; // { [productId]: { [size]: qty } }
        if (!cartItems || typeof cartItems !== 'object'){
            return res.json({ success:false, message:'Invalid cartItems' });
        }

        const ids = Object.keys(cartItems);
        const products = await productModel.find({ _id: { $in: ids } });
        const idToProduct = new Map(products.map(p => [String(p._id), p]));

        // First pass: total sticker counts per size
        const stickerSizeTotals = { Tiny: 0, Small: 0, Large: 0 };
        for (const itemId of ids){
            const prod = idToProduct.get(itemId);
            if (!prod) continue;
            const isSticker = prod.category !== 'LaptopSkin';
            if (!isSticker) continue;
            const sizes = cartItems[itemId] || {};
            for (const size in sizes){
                const qty = sizes[size] || 0;
                if (['Tiny','Small','Large'].includes(size) && qty > 0){
                    stickerSizeTotals[size] += qty;
                }
            }
        }

        // Second pass: compute per-line
        let subtotal = 0;
        const lines = [];
        for (const itemId of ids){
            const prod = idToProduct.get(itemId);
            if (!prod) continue;
            const isSticker = prod.category !== 'LaptopSkin';
            const sizes = cartItems[itemId] || {};
            for (const size in sizes){
                const qty = sizes[size] || 0;
                if (qty <= 0) continue;

                let unitBase = isSticker ? getStickerUnitPrice(size) : (prod.price || 0);
                let discountPercent = 0;
                if (isSticker && ['Tiny','Small','Large'].includes(size)){
                    discountPercent = getStickerDiscountPercent(size, stickerSizeTotals[size] || 0);
                }
                const unitAfter = unitBase * (1 - discountPercent/100);
                const lineTotal = unitAfter * qty;
                subtotal += lineTotal;
                lines.push({
                    productId: itemId,
                    name: prod.name,
                    image: prod.image?.[0] || '',
                    size,
                    qty,
                    unitBase,
                    discountPercent,
                    unitAfter,
                    lineTotal
                });
            }
        }

        return res.json({ success:true, subtotal, lines });
    } catch (error) {
        console.log(error);
        return res.json({ success:false, message:error.message });
    }
}

export { addProduct, listProducts, removeProduct, singleProduct, priceCart };