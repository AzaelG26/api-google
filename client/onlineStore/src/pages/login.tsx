import React from "react";
import '../styles/login.css'


const Login: React.FC = () => {
    return (
        <section className="principal-container">
            <div className="container-form-login">
                <h1>Sign in</h1>
                <input
                    placeholder="Email"
                    type="email"
                    required/>
                <input placeholder="Password" type="password"/>
                <section className="button">
                    <button type="submit">Login</button>
                </section>
            </div>
        </section>

    )
}
export default Login