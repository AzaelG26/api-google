import React,  {useState, useContext } from "react"
import { jwtDecode } from "jwt-decode";
import {API_DATAPERSON} from "../auth/constants.ts";
import {Simulate} from "react-dom/test-utils";

const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    try{
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id;

    }catch(error){
        console.error("Error al decodificar el token:", error);
        return null;
    }
}

const user_id = getUserIdFromToken();

const PersonalData: React.FC = ()=>{
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");

    const hablePersonalData  = async () =>{
        try{
            if (!name || !last_name || !age || !address) {
                alert("Por favor, completa todos los campos.");
                return;
            }
            const data = {
                name,
                last_name,
                age,
                address,
                user_id
            }

            const response = await fetch(`${API_DATAPERSON}/info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                }
            );
            if(response.ok){
                const result = await response.json();
                alert("Datos enviados correctamente!");
                console.log("Respuesta del servidor:", result);
            }else{
                alert("Error al enviar la información");
            }

        }catch(error){
            console.error("Hubo un error:", error);
            alert("Error al enviar los datos.");

        }
    }
    return(
        <div>
            <label>Name</label>
            <input value={name} type="text" onChange={(e) => setName(e.target.value)}/>
            <br/>
            <label>Last Name</label>
            <input value={last_name} type="text" onChange={(e) => setLast_name(e.target.value)}/>
            <br/>
            <label>Age</label>
            <input value={age} type="number" onChange={(e) => setAge((e.target.value))} />
            <br/>
            <label>Address</label>
            <input value={address} type="text" onChange={(e) => setAddress(e.target.value)}/>
            <button onClick={hablePersonalData}>Enviar</button>
        </div>

    );
}
export default PersonalData;