import React from 'react';
import '../styles/men.css';

const images = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
];

const MenPage: React.FC = () => {
    return (
        <div className="men-container">
            <h1 className="men-title">Colección Hombre</h1>
            <p className="men-description">Descubre nuestra última colección con estilo y comodidad.</p>

            <div className="carousel-container">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="carousel-slide carousel-hover"
                    >
                        <img src={image} alt={`Imagen ${index + 1}`} className="carousel-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenPage;