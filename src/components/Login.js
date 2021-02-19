import React from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router";
import apiUrlVariable from "./apiUrlVariable";
import "../estilos/styles.scss";

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

        const inputData = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        if (
            inputData.email === "" ||
            // eslint-disable-next-line
            !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
                inputData.email
            ) ||
            inputData.password === ""
        ) {
            let message;
            if (inputData.email === "") {
                message = "El email es necesario";
            } else if (
                // eslint-disable-next-line
                !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
                    inputData.email
                )
            ) {
                message = "Email invalido";
            } else if (inputData.password === "") {
                message = "La contraseña es necesaria";
            }
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: message,
            });
        } else {
            fetch(`${apiUrlVariable}/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            })
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
                    var message;
                    if (error.status === 400) {
                        message = "Ese email no esta registrado";
                    } else if (error.status === 401) {
                        message = "Contraseña incorrecta";
                    } else {
                        message = "Ocurrio un error";
                    }
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: message,
                    });
                });
            if (data.errorMessage === null) {
                setSubmitted(true);
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <div>
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
