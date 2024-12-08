import { useState } from 'react';
import API from '../../../../services/api';

const CreateSupplier = ({ onSupplierCreated }) => {
    const [formData, setFormData] = useState({
        supplier_name: '',
        contact_name: '',
        phone: '',
        email: '',
        address: '',
        is_active: 1 // ค่าเริ่มต้นเป็น true
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSupplier = async () => {
        try {
            const response = await API.post('/supplier', formData);
            onSupplierCreated(response.data); // ส่งข้อมูล supplier ใหม่กลับไป
            setFormData({
                supplier_name: '',
                contact_name: '',
                phone: '',
                email: '',
                address: '',
                is_active: 1
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };


    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Add New Supplier</h2>
            <div className="grid grid-cols-2 gap-4 text-black">
                <input
                    type="text"
                    name="supplier_name"
                    placeholder="Supplier Name"
                    value={formData.supplier_name}
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
                    value={formData.Phone}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="text"
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

                
                
            </div>
            <button
                onClick={handleAddSupplier}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 mb-3"
            >
                Save Supplier
            </button>
        </div>
    );
};

export default CreateSupplier;