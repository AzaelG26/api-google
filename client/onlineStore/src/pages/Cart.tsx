import React, {useEffect, useState} from 'react';
import '../styles/cart.css';
import {API_CLOTHES, API_CREATE_ORDER} from "../auth/constants.ts";
import {jwtDecode} from "jwt-decode";


interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}
const Cart: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const getItemsFromCart = () => {
        const storedCart = localStorage.getItem("cart");

        if (!storedCart) {
            console.log("No se encontró un carrito en el localStorage.");
            return []; // Si no hay carrito, retorna un array vacío.
        }

        try {
            const cart = JSON.parse(storedCart);
            const storedToken = localStorage.getItem("token");
            const user_id:any = jwtDecode(storedToken).id

            const userCart = cart.find((entry: any) => entry.id === user_id);
            if (!userCart || !userCart.items) {
                console.log("El carrito del usuario está vacío.");
                return []; // Si el carrito del usuario no tiene items, retorna un array vacío
            }
            return userCart.items  ; // Esto devuelve el array de items [{ id, quantity }, ...]
        } catch (error) {
            console.error("Error al parsear el carrito del localStorage:", error);
            return []; // Manejo robusto en caso de error de parsing
        }
    };


    useEffect(() => {
        const items = getItemsFromCart();
        console.log('items:', items); // Confirma que tienes los datos correctos

        if (items.length === 0) return; // Evita ejecutar la petición si no hay productos

        const productIds = items.map(item => item.id);

        fetchProductsFromCart(productIds).then(productsFromAPI => {
            // Asigna la cantidad correcta a cada producto
            const productsWithQuantity = productsFromAPI.map(product => {
                const itemInCart = items.find(item => item.id === product.id);
                return { ...product, quantity: itemInCart?.quantity ?? 0 }; // Asigna cantidad o 0 si no se encuentra
            });

            setProducts(productsWithQuantity);
        });
    }, []);



    const fetchProductsFromCart = async (productsIds: number[]) => {
        try{
            const response = await fetch(`${API_CLOTHES}/cart-products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: productsIds,
                })
            });
            if (!response.ok) {
                alert(`Error al obtener productos: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (!data.products || data.products.length === 0) {
                alert("El backend no devolvió productos.");
                return [];
            }
            setProducts(data.products);
            return data.products;

        }catch(error){
            alert("Error al realizar la solicitud:" + error);
            return [];
        }
    };


    const handleCheckout = async () => {
        const storedToken = localStorage.getItem("token");
        const formattedProducts = products.map(product => ({
            id: product.id,
            quantity: product.quantity
        }));

        if (!storedToken) {
            alert("Vuelve a iniciar sesion");
            return
        };
        const decodeToken:any = jwtDecode(storedToken);
        const userId = decodeToken.id;
        try{
            const response = await fetch(`${API_CREATE_ORDER}/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    products: formattedProducts,
                })
            });
            if (!response.ok) {
                console.log(`Error al crear la orden: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Orden creada con éxito: " + data.message);


        }catch(error){

        }
    }


    return (
        <div className="cart-container">
            <h2 className="cart-title">Tu Carrito de Compras</h2>
            <div className="cart-items">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="cart-item">
                            <h3>{product.name}</h3>
                            <p>Precio: ${product.price}</p>
                            <p>Cantidad: {product.quantity}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en tu carrito.</p>
                )}
            </div>

            <button className="checkout-button" onClick={handleCheckout}>
                Proceder al Pago
            </button>

        </div>
    );
};

export default Cart;