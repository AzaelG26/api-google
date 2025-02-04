import React, { useEffect, useState } from 'react';
import '../styles/women.css';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    category?: string;
    price?: number; // Incluye campos adicionales según la respuesta de la API
}

const Women: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
    const [cart, setCart] = useState<{ [key: number]: number }>({}); // Estado para el carrito
    const [loading, setLoading] = useState<boolean>(true); // Estado para la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    // Función para traer los productos del backend
    const fetchProducts = async () => {
        try {
            const token = "TU_TOKEN_JWT"; // Reemplaza esto si estás usando autenticación con JWT
            const response = await axios.get('http://localhost:3000/api/products/catalog', {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviar el token si es necesario
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
    const handleAddToCart = (productId: number) => {
        handleQuantityChange(productId, 1);
    };

    // Renderización
    return (
        <div className="catalog-container">
            <h2 className="catalog-title">Catálogo de Mujeres</h2>

            {loading && <p>Cargando productos...</p>}
            {error && <p className="error-message">{error}</p>}

            <ul className="product-list">
                {!loading && !error && products.length > 0 ? (
                    products.map((product) => (
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
                                onClick={() => handleAddToCart(product.id)}
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