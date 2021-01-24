import React from "react";
import { AuthContext } from "../App";
import "./estilos/input-styles.css";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router";

export const Login = () => {
    const { dispatch } = React.useContext(AuthContext);
    const [submitted, setSubmitted] = React.useState(false);

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null,
    };

    const [data, setData] = React.useState(initialState);

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null,
        });

        fetch(
            `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/login`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                throw response;
            })
            .then((data) => {
                dispatch({
                    type: "LOGIN",
                    payload: data,
                });
            })
            .catch((error) => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: "Credenciales invalidas",
                });
            });
        if (data.errorMessage === null) {
            setSubmitted(true);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <div className="">
                    <div className="center-div">
                        <h1>Inicio de sesión</h1>
                        <label htmlFor="email" className="input-label">
                            Email
                            <input
                                type="text"
                                value={data.email}
                                onChange={handleInputChange}
                                name="email"
                                id="email"
                                className="input-style"
                            />
                        </label>

                        <label htmlFor="password" className="input-label">
                            Contraseña
                            <input
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                name="password"
                                id="password"
                                className="input-style"
                            />
                        </label>

                        <button disabled={data.isSubmitting} className="button">
                            {data.isSubmitting ? (
                                <Spinner
                                    className="loading"
                                    animation="border"
                                />
                            ) : (
                                "Ingresar"
                            )}
                            {submitted && (
                                <Redirect
                                    push
                                    to={{
                                        pathname: "/",
                                    }}
                                />
                            )}
                        </button>

                        <Link to="/register">Crear cuenta</Link>

                        {data.errorMessage && (
                            <div className="login-register-fail">
                                {data.errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
