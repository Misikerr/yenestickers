import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchALLOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        const sorted = [...response.data.orders].sort((a,b)=> (b?.date || 0) - (a?.date || 0));
        setOrders(sorted);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (event, orderId) => {
    const status = event.target.value;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchALLOrders()
        toast.success("Order status updated");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };

  const removeOrder = async (orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/remove",
        { orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchALLOrders();
        toast.success("Order removed");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchALLOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-500">Order Page</h3>
      <div>
        {loading && (
          <div className="py-10 text-center text-slate-400 text-sm">Loading orders…</div>
        )}
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="relative grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-md"
          >
            <p className="w-12" >ORDERS</p>  
            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ display: 'grid', gap: 8 }}>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={item?.image?.[0]} alt={item?.name || 'item'} loading='lazy' style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f3f4f6' }} />
                    <p>
                      {item?.name} x {item?.quantity} <span> {item?.size} </span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">{order?.address?.fullName || "-"}</p>
              <div style={{ color: "#475467" }}>
                <p>{order?.address?.address || "-"}</p>
                {order?.address?.deliveryOption && (
                  <p>
                    Delivery: {order.address.deliveryOption === 'express' ? 'Express (1–4 days)' : order.address.deliveryOption === 'pickup' ? 'Pickup (same day at campus)' : 'Standard (5–9 days)'}
                  </p>
                )}
                {order?.address?.notes && (
                  <p style={{ marginTop: 4 }}>Notes: {order.address.notes}</p>
                )}
              </div>
              <p>{order?.address?.phone || "-"}</p>
              {order?.address?.paymentProofUrl && (
                <a href={order.address.paymentProofUrl} target="_blank" rel="noreferrer" style={{ marginTop: 6 }}>
                  <img src={order.address.paymentProofUrl} alt="Payment proof" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </a>
              )}
            </div>
            <p onClick={() => removeOrder(order._id)} title="Remove order" className="absolute top-3 right-3 cursor-pointer text-base md:text-lg text-gray-400 hover:text-red-600 select-none">X</p>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
            <select value={order.status} onChange={(e) => updateOrderStatus(e, order._id)} className="p-2 font-semibold">
              <option value="Order Placed">Order Placed</option>
              <option value="payment accepted">Payment Accepted</option>
              <option value="payment rejected">Payment Rejected</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
