import React from 'react';
import '../styles/children.css';

interface Child {
    name: string;
    description: string;
}

const childrenData: Child[] = [
    { name: 'Wolfgang Amadeus Mozart', description: 'Compositor prodigio que comenzó a componer a los 5 años.' },
    { name: 'Blaise Pascal', description: 'Matemático y físico que a los 12 años ya había desarrollado teoremas geométricos.' },
    { name: 'Malala Yousafzai', description: 'Activista por la educación que, a los 17 años, se convirtió en la persona más joven en recibir el Premio Nobel de la Paz.' },
];

const Children: React.FC = () => {
    return (
        <div className="children-container">
            <h2 className="title">Niños Destacados</h2>
            <ul className="children-list">
                {childrenData.map((child, index) => (
                    <li key={index} className="child-item">
                        <h3 className="child-name">{child.name}</h3>
                        <p className="child-description">{child.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Children;
