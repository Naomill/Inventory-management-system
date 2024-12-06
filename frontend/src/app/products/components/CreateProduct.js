import { useState } from 'react';
import API from '../../../../services/api'


const CreateProduct = ({ onProductCreated }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        sku: '',
        category_id: '',
        description: '',
        quantity: '',
        unit_price: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddProduct = async () => {
        try {
            const response = await API.post('/products', formData);
            onProductCreated(response.data); // ส่งสินค้าใหม่กลับไป
            setFormData({
                product_name: '',
                sku: '',
                category_id: '',
                description: '',
                quantity: '',
                unit_price: ''
            });
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Add New Product</h2>
            <div className="grid grid-cols-2 gap-4 text-black">
                <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="number"
                    name="category_id"
                    placeholder="Category ID"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
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
                    step="0.01"
                    name="unit_price"
                    placeholder="Unit Price"
                    value={formData.unit_price}
                    onChange={handleInputChange}
                    className="border px-2 py-1"
                />
            </div>
            <button
                onClick={handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
            >
                Save Product
            </button>
        </div>
    );
};

export default CreateProduct;
