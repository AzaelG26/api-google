import React, {useEffect} from "react";
import {GoogleMap, LoadScript} from "@react-google-maps/api";

const containerStyle = {
    width: '90%',
    height: '90vh',
}

const center = {
    lat: 55.53,
    lng: 9.4
}
const GOOGLE_MAPS_API_KEY = "AIzaSyAy1t4OmyxU5o_bg5MLqDcMlZqANur9Gsw";
//const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);


const MapaGoogle: React.FC = () => {
    useEffect(() => {
        const distanceMatrixRequest = () => {
            const service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix({
                origins: [{ lat: 55.93, lng: -3.118 }, "Greenwich, England"],
                destinations: ["Stockholm, Sweden", { lat: 50.087, lng: 14.421 }],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false,
            }, (response, status) => {
                if (status === "OK") {
                    console.log("Distance Matrix Response:", response);
                } else {
                    console.error("Error with Distance Matrix Service:", status);
                }
            });
        };

        if (typeof google !== "undefined") {
            distanceMatrixRequest();
        }
    }, []);


    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            </GoogleMap>
        </LoadScript>
    );
};

export default MapaGoogle;

