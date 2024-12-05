const ViewProduct = ({ product, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                <p><strong>ID:</strong> {product.product_id}</p>
                <p><strong>Name:</strong> {product.product_name}</p>
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Category:</strong> {product.category_name}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                <p><strong>Price:</strong> {product.unit_price}</p>
                <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ViewProduct;
