import React, {useState} from "react";
import '../styles/login.css'
import DefaultLayout from "../layouts/DefaultLayout.tsx";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider.tsx";
import {API_URL} from "../auth/constants.ts";

export default  function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const goTo = useNavigate()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/register`,{
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            if(response.ok) {
                setErrorResponse("");
                goTo('/login');
                alert(data.message)
            }
            else{
                console.log("Sometime went wrong", data.message)
                setErrorResponse(data.message);
            }
        }catch (e) {
            console.log(e)
            setErrorResponse("Unexpected error occurred. Please try again.");
        }
    }


    const auth = useAuth();
    if (auth.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }

    return(
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
                <section className="principal-container">
                    <div className="container-form-login">
                        <h1>Sign up</h1>
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
                            <button type="submit">Register</button>
                        </section>
                    </div>
                </section>
            </form>
        </DefaultLayout>

    )
}
