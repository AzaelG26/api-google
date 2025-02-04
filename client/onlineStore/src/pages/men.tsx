import React, { useEffect, useState } from 'react';
import '../styles/men.css';
import axios from 'axios';

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

    // Llama a la API para obtener los productos
    const fetchProducts = async () => {
        try {
            const token = "TU_TOKEN_JWT";
            const response = await axios.get('http://localhost:3000/api/products/catalog', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data);
        } catch (err: any) {
            console.error("Error al cargar los productos:", err);
            setError("No se pudieron cargar los productos. Intenta nuevamente.");
        } finally {
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

    const handleAddToCart = (productId: number) => {
        handleQuantityChange(productId, 1);
    };
    return (
        <div className="men-container">
            <h1 className="men-title">Colección Hombre</h1>
            <p className="men-description">Descubre nuestra última colección con estilo y comodidad.</p>

            {loading && <p>Cargando productos...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="product-list">
                {!loading && !error && products.length > 0 ? (
                    products.map((product) => (
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
                                onClick={() => handleAddToCart(product.id)}
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