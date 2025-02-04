import React, {useState} from 'react';
import '../styles/dashboard.css'
import {API_PRODUCTS} from "../auth/constants.ts";

const Dashboard:React.FC = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('')

    const handleRegister = async () => {


        try {
            if (!name || !category || !price) {
                alert("Por favor, completa todos los campos.");
                return;
            }
            const token = localStorage.getItem('token');
            if (!token) {
                alert("No estás autenticado. Por favor, inicia sesión.");
                return;
            }

            const productData = {
                name,
                category,
                price
            }
            const response = await fetch(`${API_PRODUCTS}/createProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(productData),

            });

            if (response.ok) {
                alert('Product added successfully');
                setName('');
                setCategory('');
            } else {
                alert('Hubo un problema al registrar el producto.');

            }
        } catch (e) {
            alert('Error al enviar los datos. Revisa la consola para más información.' + e);
        }
    }

    return (
        <div className="container-dashboard">
            <nav className="nav-dashboard"></nav>
            <h1>¡Bienvenido!</h1>
            <section className="add-products">

                <h2>Products</h2>
                <br/>
                <label >Name</label> <br/>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}/> <br/>
                <label>Category</label> <br/>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="men">man</option>
                    <option value="women">woman</option>
                    <option value="children">children</option>
                </select>

                <br/>
                <label>Price</label> <br/>
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}/> <br/>
                <br/>
                <button onClick={handleRegister}>Registrar</button>
            </section>
        </div>
    );
}
export default Dashboard;