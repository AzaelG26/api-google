import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    marginTop: "100px",
    width: "80%",
    height: "80vh",
};

const initialOrigin = {
    lat: 25.686614,
    lng: -100.316113,
};

const initialDestination = {
    lat: 20.87380625221217,
    lng: -100.58816691932074,
};

// Clave API de Google Maps
const GOOGLE_MAPS_API_KEY = "AIzaSyAy1t4OmyxU5o_bg5MLqDcMlZqANur9Gsw";

const MapaGoogle: React.FC = () => {
    const [origin, setOrigin] = useState(initialOrigin); // Punto de origen.
    const [destination, setDestination] = useState(initialDestination); // Punto de destino.
    const [route, setRoute] = useState<google.maps.LatLngLiteral[]>([]); // Ruta calculada entre origen y destino.

    // Cargar la API de Google Maps
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: ["geometry", "places"], // Librerías necesarias para DirectionsService.
    });

    // Obtener la ubicación actual para el destino.
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setDestination({ lat: latitude, lng: longitude });
                },
                (error) => console.error("Error obteniendo la ubicación:", error)
            );
        }
    }, []);

    // Calcular la ruta usando DirectionsService.
    useEffect(() => {
        if (!isLoaded || !origin || !destination) return;

        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING, // Cambiar a WALKING, TRANSIT, o BICYCLING si es necesario.
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result.routes.length > 0) {
                    // Convierte los puntos de la ruta en objetos {lat, lng}.
                    const points = result.routes[0].overview_path.map((point) => ({
                        lat: point.lat(),
                        lng: point.lng(),
                    }));
                    setRoute(points); // Guarda la ruta calculada.
                } else {
                    console.error("Error al calcular la ruta: " + status);
                }
            }
        );
    }, [isLoaded, origin, destination]);

    // Animar el movimiento del marcador a lo largo de la ruta.
    useEffect(() => {
        if (route.length === 0) return;

        let step = 0;

        // Configura el intervalo para avanzar punto por punto en la ruta.
        const interval = setInterval(() => {
            setOrigin(route[step]); // Mueve el marcador al siguiente punto.
            step++;

            // Detiene la animación cuando se llega al final de la ruta.
            if (step >= route.length) {
                clearInterval(interval);
            }
        }, 990); // Cada 1000ms, que es un segundo, avanza un paso.

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente.
    }, [route]);

    return isLoaded ? (

        <GoogleMap mapContainerStyle={containerStyle} center={origin} zoom={15}>
            {/* Marcador de origen (animado a lo largo de la ruta calculada). */}
            <Marker position={origin} label="Origen" />

            {/* Marcador de destino (estático). */}
            <Marker position={destination} label="Destino" />

            {/* Línea de la ruta calculada */}
            <Polyline
                path={route}
                options={{
                    strokeColor: "#0000FF", // Color azul.
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                }}
            />
        </GoogleMap>
    ) : (
        <p>Cargando mapa...</p>
    );
};

export default MapaGoogle;