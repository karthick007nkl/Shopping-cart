import React from 'react';

function ShoppingCart({ cart, ordered, onQuantityChange, onRemove, onOrderNow, onCancel }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // WhatsApp order message
  const getWhatsAppMessage = () => {
    if (cart.length === 0) return '';
    let message = 'Order Details:%0A';
    cart.forEach(item => {
      message += `${item.name} x ${item.quantity} = $${item.price * item.quantity}%0A`;
    });
    message += `%0ATotal: $${total}`;
    return message;
  };

  const handleOrderNowClick = () => {
    if (cart.length === 0) return;
    let message = 'Order Details:%0A';
    cart.forEach(item => {
      message += `${item.name} x ${item.quantity} = $${item.price * item.quantity}%0A`;
    });
    message += `%0ATotal: $${total}`;
    const whatsappUrl = `https://wa.me/message/3MWH77MUFV5RE1?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onOrderNow();
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', border: '1px solid #ccc', padding: 20, borderRadius: 8 }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        ordered ? <p>Order placed successfully!</p> : <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {cart.map(item => (
              <li key={item.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{item.name}</span>
                <span>
                  <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1} style={{ marginRight: 4 }}>-</button>
                  <input type="number" min="1" value={item.quantity} onChange={e => onQuantityChange(item.id, Number(e.target.value))} style={{ width: 40, textAlign: 'center' }} />
                  <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} style={{ marginLeft: 4 }}>+</button>
                </span>
                <span>${item.price} x {item.quantity} = ${item.price * item.quantity}</span>
                <button onClick={() => onRemove(item.id)} style={{ marginLeft: 8, color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button>
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${total}</p>
          <button onClick={handleOrderNowClick} style={{ marginRight: 10 }}>Order Now (WhatsApp)</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
