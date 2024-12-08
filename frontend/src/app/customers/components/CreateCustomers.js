import { useState } from 'react';
import API from '../../../../services/api';

const CreateCustomers = ({ onCustomerCreated }) => {
    const [formData, setFormData] = useState({
        customer_name: '',
        contact_name: '',
        phone: '',
        email: '',
        address: '',
        status: 'active' // ค่าเริ่มต้นเป็น active
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddCustomer = async () => {
        try {
            const response = await API.post('/customers', formData);
            onCustomerCreated(response.data); // ส่งข้อมูลลูกค้าใหม่กลับไป
            setFormData({
                customer_name: '',
                contact_name: '',
                phone: '',
                email: '',
                address: '',
                status: 'active'
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Add New Customer</h2>
            <div className="grid grid-cols-2 gap-4 text-black">
                <input
                    type="text"
                    name="customer_name"
                    placeholder="Customer Name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="text"
                    name="contact_name"
                    placeholder="Contact Name"
                    value={formData.contact_name}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
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
                onClick={handleAddCustomer}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 mb-3"
            >
                Save Customer
            </button>
        </div>
    );
};

export default CreateCustomers;