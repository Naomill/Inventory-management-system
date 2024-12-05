'use client';

import { useEffect, useState } from 'react';
import API from '../../services/api';


export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products/with-categories');
        console.log(data); // ตรวจสอบข้อมูลที่ดึงมา
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Products Page</h1>
      <hr className='bg-gray-500 my-3'></hr>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>{product.sku}</td>
                <td>{product.category_name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>${Number(product.unit_price).toFixed(2)}</td>
                <td>{new Date(product.created_at).toLocaleString()}</td>
                <td>{new Date(product.updated_at).toLocaleString()}</td>
                <td>{product.is_active}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    

    
    </div>
  );
}
