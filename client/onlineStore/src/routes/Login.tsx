import React, {useState} from "react";
import '../styles/login.css'
import DefaultLayout from "../layouts/DefaultLayout.tsx";
import {useAuth} from "../auth/AuthProvider.tsx";
import {Navigate, resolvePath, useNavigate} from "react-router-dom";
import {API_URL} from "../auth/constants.ts";
import {AuthResponse, AuthResponseError} from "../types/types.ts";

export default  function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo =   useNavigate();
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log("Formulario enviado, preparando fetch...");
        try{
            const response = await fetch(`${API_URL}/login`,{
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            const data: AuthResponse = await response.json();
            console.log("Respuesta del servidor:", data);

            if (response.ok){
                console.log("You are Log in")
                console.log(data.token);
                auth.saveUser(data);
                setErrorResponse("");
                goTo('/dashboard');
            }
            else{
                console.log("Sometime went wrong", data.message)
                setErrorResponse(data.message);
            }
        }catch (error){
            console.log("Error en fetch o código:", error);
            setErrorResponse("Unexpected error occurred. Please try again.");
        }
    }

    if (auth.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }

    return(
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
                <section className="principal-container">
                    <div className="container-form-login">
                        <h1>Sign in</h1>
                        {errorResponse && (<p className="error-message">{errorResponse}</p>)}
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}/>

                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>

                        <section className="button">
                            <button type="submit">Login</button>
                        </section>
                    </div>
                </section>
            </form>
        </DefaultLayout>

)
}
