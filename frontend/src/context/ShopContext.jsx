import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = 'ETB ';
    const delivery_fee = 30;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if(!size){
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId,size}, {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount =  () => {
        return serverPricing?.subtotal || 0;
    }

    const [serverPricing, setServerPricing] = useState(null);

    const priceCartServer = useCallback(async () => {
        try {
            const response = await axios.post(backendUrl + '/api/product/price-cart', { cartItems });
            if (response.data.success){
                setServerPricing(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [backendUrl, cartItems]);

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems){
            const productExists = products.find(p => p._id === itemId);
            if (!productExists) continue; // ignore items no longer in catalog
            for (const size in cartItems[itemId]){
                try {
                    const qty = cartItems[itemId][size] || 0;
                    if (qty > 0){
                        totalCount += qty;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                
                await axios.post(backendUrl + '/api/cart/update', {itemId,size,quantity}, {headers: {token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

        // getting product data from the backend 
    // install axios 
    const getProductsData = useCallback(async () => {
        try {
            setLoadingProducts(true);
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoadingProducts(false);
        }
    }, [backendUrl]);

    // also add this
    const getUserCart = useCallback(async ( token ) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }, [backendUrl]);

    useEffect(()=>{
        getProductsData()
    },[getProductsData])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[token, getUserCart])

    // Re-price cart whenever items or products change
    useEffect(()=>{
        priceCartServer();
    },[cartItems, products, priceCartServer])

    const value = {
        products , currency , delivery_fee,
        search, setSearch,setCartItems,
        showSearch, setShowSearch,cartItems,
        addToCart,getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,
        setToken,token,
        serverPricing,
        priceCartServer,
        loadingProducts,
        // helpers for UI
        getStickerUnitPrice: (size) => {
            switch(size){
                case 'Tiny': return 35;
                case 'Small': return 40;
                case 'Large': return 45;
                default: return 40;
            }
        },
        getStickerDiscountPercent: (size, totalCount) => {
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
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;