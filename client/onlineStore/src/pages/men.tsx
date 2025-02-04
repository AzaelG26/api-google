import React from 'react';
import '../styles/men.css';


const images = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
]

const MenPage:React.FC = () => {
    return (
        <div className="men-container">
            {}
            <h1 className="men-title">Ropa Hombre</h1>

            {}
            <div className="carousel-container">
                {}
                {images.map((image, index) => (
                    <div key={index} className="carousel-slide">
                        <img src={image} alt={`Imagen ${index + 1}`} className="carousel-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenPage;