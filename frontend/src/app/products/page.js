"use client";

import { useState, useEffect } from 'react';
import API from '../../../services/api';
import CreateProduct from './components/CreateProduct';
import ViewProduct from './components/ViewProduct';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get('/products');
                setProducts(response.data.sort((a, b) => a.product_id - b.product_id));
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    const handleProductCreated = (newProduct) => {
        setProducts([...products, newProduct].sort((a, b) => a.product_id - b.product_id));
        setShowAddForm(false);
    };

    const handleViewProduct = async (id) => {
        try {
            const response = await API.get(`/products/${id}`);
            setSelectedProduct(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
            >
                {showAddForm ? 'Cancel' : 'Add Product'}
            </button>

            {showAddForm && <CreateProduct onProductCreated={handleProductCreated} />}

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.product_id}>
                            <td className="border border-gray-300 px-4 py-2">{product.product_id}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleViewProduct(product.product_id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedProduct && (
                <ViewProduct
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default ProductsPage;
