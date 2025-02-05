import React, { useEffect, useState } from 'react';
import '../styles/men.css';
import axios from 'axios';
import { API_CLOTHES } from '../auth/constants';
import {jwtDecode} from "jwt-decode";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

const MenPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const storedToken = localStorage.getItem("token");
    const user_id = jwtDecode(storedToken).id


    // Llama a la API para obtener los productos
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_CLOTHES}/catalog`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProducts(response.data);
        } catch (err) {
            console.error("Error al cargar los productos:", err);
            setError("No se pudieron cargar los productos. Intenta nuevamente.");
            alert(err)
        } finally {
            alert('err')

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleQuantityChange = (productId: number, amount: number) => {
        setCart((prevCart) => {
            const newQuantity = (prevCart[productId] || 0) + amount;
            if (newQuantity > 0) {
                return { ...prevCart, [productId]: newQuantity };
            } else {
                const { [productId]: _, ...rest } = prevCart;
                return rest;
            }
        });
    };

    const handleAddToCart = (productId: number, quantity: number) => {
        handleQuantityChange(productId, 1);
        const storedCartInLocalStorage = localStorage.getItem("cart");
        if (!storedCartInLocalStorage) {
            const newCart = [{ id: user_id, items: [] }];
            localStorage.setItem("cart", JSON.stringify(newCart));
        }else{
            const cart = JSON.parse(storedCartInLocalStorage);
            const userCart = cart.find((item: { id: string }) => item.id === user_id);
            if (!userCart) {
                cart.push({ id: user_id, items: [] });
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`Carrito creado en localStorage para el usuario ${user_id}`);
            }

            const updatedCart = localStorage.getItem("cart");
            if (updatedCart) {
                const cart = JSON.parse(updatedCart);
                const userCart = cart.find((item: { id: string }) => item.id === user_id);
                if (userCart) {
                    const existingProduct = userCart.items.find((item: { id: number }) => item.id === productId);
                    if(existingProduct){
                        existingProduct.quantity += quantity;
                    }else{
                        userCart.items.push({ id: productId, quantity: quantity });
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert(`Producto agregado al carrito para el usuario ${user_id}`);
                }
            }
        }
        alert(`Producto agregado. ID: ${productId}, Cantidad: ${quantity}`);
    };

    const filteredProducts = products.filter(product => product.category === 'men');

    return (
        <div className="men-container">
            <h1 className="men-title">Colección Hombre</h1>
            <p className="men-description">Descubre nuestra última colección con estilo y comodidad.</p>

            {loading && <p>Cargando productos...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="product-list">
                {!loading && !error && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-item">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <div className="quantity-controls">
                                <button
                                    className="quantity-button"
                                    onClick={() => handleQuantityChange(product.id, -1)}
                                    disabled={!cart[product.id]}
                                >
                                    -
                                </button>
                                <span className="quantity-display">{cart[product.id] || 0}</span>
                                <button
                                    className="quantity-button"
                                    onClick={() => handleQuantityChange(product.id, 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={() => handleAddToCart(product.id, cart[product.id] || 1)}
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    ))
                ) : (
                    !loading && <p className="no-products-message">No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default MenPage;