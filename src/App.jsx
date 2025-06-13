import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import Chatbot from './components/Chatbot';

const App = () => {
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: product.id, name: product.title, price: product.price, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleOrderNow = () => {
    setOrdered(true);
    setCart([]);
  };

  const handleCancel = () => {
    setCart([]);
    setOrdered(false);
  };

  return (
    <div className="App">
      <h1>Food Order App</h1>
      <button onClick={() => setShowChatbot(true)} style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000, background: '#007bff', color: '#fff', border: 'none', borderRadius: 50, padding: '12px 24px', fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        Help
      </button>
      {showChatbot && (
        <div style={{ position: 'fixed', bottom: 80, right: 30, zIndex: 1001 }}>
          <Chatbot />
          <button onClick={() => setShowChatbot(false)} style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: '#fff', border: 'none', borderRadius: '0 8px 0 8px', padding: '2px 8px', cursor: 'pointer' }}>X</button>
        </div>
      )}
      <ProductList onAddToCart={handleAddToCart} />
      <ShoppingCart
        cart={cart}
        ordered={ordered}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onOrderNow={handleOrderNow}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;