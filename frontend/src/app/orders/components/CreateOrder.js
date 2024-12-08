import { useState } from 'react';
import API from '../../../../services/api';

const CreateOrder = ({ onOrderCreated }) => {

    const [formData, setFormData] = useState({
        supplier_id: '',
        product_id: '',
        quantity: '',
        subtotal: '',
        total_amount: '',
        status: 'Pending' // ค่าเริ่มต้นเป็น true
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddOrder = async () => {
        try {
            const response = await API.post('/orders', formData);
            onOrderCreated(response.data); // ส่งข้อมูล order ใหม่กลับไป
            setFormData({
                supplier_id: '',
                product_id: '',
                quantity: '',
                subtotal: '',
                total_amount: '',
                status: 'Pending'
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };


    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Add New Order</h2>
            <div className="grid grid-cols-2 gap-4 text-black">
                <input
                    type="number"
                    name="supplier_id"
                    placeholder="Supplier ID"
                    value={formData.supplier_id}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="number"
                    name="product_id"
                    placeholder="Product ID"
                    value={formData.product_id}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="number"
                    name="subtotal"
                    placeholder="Subtotal"
                    value={formData.subtotal}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="number"
                    name="total_amount"
                    placeholder="Total Amount"
                    value={formData.total_amount}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />

                
                
            </div>
            <button
                onClick={handleAddOrder}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 mb-3"
            >
                Save Order
            </button>
        </div>
    );
};

export default CreateOrder;