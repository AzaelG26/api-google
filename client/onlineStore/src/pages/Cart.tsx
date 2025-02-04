import React from 'react';
import { useCart } from '../context/CartContext'; // Importamos el contexto del carrito
import '../styles/cart.css';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

    // Costo fijo de envío (puedes hacerlo dinámico si es necesario)
    const shippingCost = 10.0;

    return (
        <div className="cart-container">
            <h2 className="cart-title">Tu Carrito de Compras</h2>
            <div className="cart-items">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="item-details">
                                <span className="item-name">{item.name}</span>
                                <span className="item-price">
                                    ${item.price.toFixed(2)} x {item.quantity}
                                    <strong> = ${(item.price * item.quantity).toFixed(2)}</strong>
                                </span>
                            </div>
                            <div className="item-quantity">
                                <button
                                    className="quantity-button"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="quantity-display">{item.quantity}</span>
                                <button
                                    className="quantity-button"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="remove-item-button"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en el carrito. ¡Agrega algo desde el catálogo!</p>
                )}
            </div>
            {cart.length > 0 && (
                <div className="cart-summary">
                    <div className="summary-item">
                        <span className="summary-label">Subtotal:</span>
                        <span className="summary-value">${getTotal().toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Envío:</span>
                        <span className="summary-value">${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Total:</span>
                        <span className="summary-value">
                            ${(getTotal() + shippingCost).toFixed(2)}
                        </span>
                    </div>
                </div>
            )}
            <button className="checkout-button" disabled={cart.length === 0}>
                Proceder al Pago
            </button>
        </div>
    );
};

export default Cart;