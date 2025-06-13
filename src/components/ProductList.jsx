import React, { useEffect, useState } from 'react';

const localImages = [
  process.env.PUBLIC_URL + '/images/1000278926.jpg',
  process.env.PUBLIC_URL + '/images/1000278927.jpg',
  process.env.PUBLIC_URL + '/images/1000278928.jpg',
  process.env.PUBLIC_URL + '/images/1000278929.jpg',
];

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=12')
      .then(res => res.json())
      .then(data => {
        // Assign local images in a round-robin fashion
        const productsInINR = data.products.map((product, idx) => ({
          ...product,
          price: Math.round(product.price * 83),
          thumbnail: localImages[idx % localImages.length],
        }));
        setProducts(productsInINR);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1.5rem',
      margin: '2rem 0'
    }}>
      {products.map(product => (
        <div key={product.id} style={{
          border: '1px solid #eee',
          borderRadius: 8,
          padding: 16,
          background: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <img src={product.thumbnail} alt="Nuts" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%' }} />
          <h3 style={{ fontSize: 18, margin: '12px 0 6px' }}>{product.title}</h3>
          <p style={{ color: '#888', margin: 0 }}>₹{product.price}</p>
          <button onClick={() => onAddToCart(product)} style={{ marginTop: 10, padding: '6px 16px', borderRadius: 4, border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
