import React from 'react';
import '../styles/women.css';

const womenData = [
    { name: 'Marie Curie', description: 'Pionera en el estudio de la radiactividad.' },
    { name: 'Ada Lovelace', description: 'Considerada la primera programadora de computadoras.' },
    { name: 'Frida Kahlo', description: 'Famosa pintora mexicana conocida por sus autorretratos.' },

];

const Women: React.FC = () => {
    return (
        <div className="women-container">
        <h2 className="title">Mujeres Destacadas</h2>
    <ul className="women-list">
        {womenData.map((woman, index) => (
                <li key={index} className="woman-item">
            <h3 className="woman-name">{woman.name}</h3>
                <p className="woman-description">{woman.description}</p>
            </li>
))}
    </ul>
    </div>
);
};

export default Women;
