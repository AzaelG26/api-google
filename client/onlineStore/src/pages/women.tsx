import React, { useEffect, useState } from 'react';
import '../styles/women.css';
import axios from 'axios';
import {API_CLOTHES} from "../auth/constants.ts";
import {jwtDecode} from "jwt-decode";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

const Women: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ [key: number]: number }>({}); // Estado para el carrito
    const [loading, setLoading] = useState<boolean>(true); // Estado para la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const storedToken = localStorage.getItem("token");
    const user_id = jwtDecode(storedToken).id

    // Función para traer los productos del backend
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_CLOTHES}/catalog`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProducts(response.data); // Guardar los productos en el estado
        } catch (err: any) {
            console.error("Error al cargar los productos:", err);
            setError("Error al cargar productos. Por favor, inténtalo nuevamente.");
        } finally {
            setLoading(false); // Desactivar el estado de carga
        }
    };

    // Llamar a fetchProducts cuando el componente se monte
    useEffect(() => {
        fetchProducts();
    }, []);

    // Maneja el cambio de la cantidad
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

    // Agrega productos al carrito
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

    // Filtrar productos por categoría "women"
    const filteredProducts = products.filter(product => product.category === 'women');

    // Renderización
    return (
        <div className="catalog-container">
            <h2 className="catalog-title">Catálogo de Mujeres</h2>

            {loading && <p>Cargando productos...</p>}
            {error && <p className="error-message">{error}</p>}

            <ul className="product-list">
                {!loading && !error && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <li key={product.id} className="product-item">
                            <span className="product-name">{product.name}</span>
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
                        </li>
                    ))
                ) : (
                    !loading && <p className="no-products">No hay productos disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default Women;