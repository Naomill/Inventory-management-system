import { useState } from 'react';
import API from '../../../../services/api';

const CreateExportOrder = ({ onExportOrderCreated }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        quantity: '',
        order_date: '',
        shipping_date: '',
        shipping_address: '',
        shipping_status: '',
        transaction_status: '',
        subtotal: '',
        total_amount: '',
        status: 'active' // ค่าเริ่มต้นเป็น active
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddExportOrder = async () => {
        try {
            const response = await API.post('/export-orders', formData);
            onExportOrderCreated(response.data); // ส่งข้อมูลคำสั่งซื้อใหม่กลับไป
            setFormData({
                product_name: '',
                quantity: '',
                order_date: '',
                shipping_date: '',
                shipping_address: '',
                shipping_status: '',
                transaction_status: '',
                subtotal: '',
                total_amount: '',
                status: 'active'
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Add New Export Order</h2>
            <div className="grid grid-cols-2 gap-4 text-black">
                {/* Product Name */}
                <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Quantity */}
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Order Date */}
                <input
                    type="date"
                    name="order_date"
                    placeholder="Order Date"
                    value={formData.order_date}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Shipping Date */}
                <input
                    type="date"
                    name="shipping_date"
                    placeholder="Shipping Date"
                    value={formData.shipping_date}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Shipping Address */}
                <textarea
                    name="shipping_address"
                    placeholder="Shipping Address"
                    value={formData.shipping_address}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Shipping Status */}
                <input
                    type="text"
                    name="shipping_status"
                    placeholder="Shipping Status"
                    value={formData.shipping_status}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Transaction Status */}
                <input
                    type="text"
                    name="transaction_status"
                    placeholder="Transaction Status"
                    value={formData.transaction_status}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Subtotal */}
                <input
                    type="number"
                    name="subtotal"
                    placeholder="Subtotal"
                    value={formData.subtotal}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Total Amount */}
                <input
                    type="number"
                    name="total_amount"
                    placeholder="Total Amount"
                    value={formData.total_amount}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                {/* Status */}
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <button
                onClick={handleAddExportOrder}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 mb-3"
            >
                Save Export Order
            </button>
        </div>
    );
};

export default CreateExportOrder;
