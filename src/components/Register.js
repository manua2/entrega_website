import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../App";
import "./estilos/input-styles.css";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router";

export const Login = () => {
    const { dispatch } = React.useContext(AuthContext);

    const initialState = {
        name: "",
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null,
        submitted: false,
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
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        if (
            inputData.name === "" ||
            inputData.email === "" ||
            !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                inputData.email
            ) ||
            inputData.password === "" ||
            inputData.password.length < 7
        ) {
            let message;
            if (inputData.name === "") {
                message = "El nombre es necesario";
            } else if (inputData.email === "") {
                message = "El email es necesario";
            } else if (
                !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    inputData.email
                )
            ) {
                message = "Email invalido";
            } else if (inputData.password === "") {
                message = "La contraseña es necesaria";
            } else if (inputData.password.length < 7) {
                message =
                    "La contraseña tiene que tener por lo menos 7 caracteres";
            }
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: message,
            });
        } else {
            fetch(
                `https://cors-anywhere.herokuapp.com/https://entregafinalpptapi.herokuapp.com/register`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: data.name,
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
                        type: "REGISTER",
                        payload: data,
                    });
                    setData({
                        ...data,
                        submitted: true,
                    });
                })
                .catch((error) => {
                    var message;
                    if (error.status === 500) {
                        message = "Email ya registrado";
                    } else if (error.status === 400) {
                        message = "Error al registrarse";
                    }
                    setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: message,
                        submitted: false,
                    });
                });
        }
    };

    return (
        <div className="container">
            <div className="center-div">
                <form onSubmit={handleFormSubmit}>
                    <h1>Registrarse</h1>

                    <label htmlFor="name" className="input-label">
                        Nombre
                        <input
                            type="text"
                            value={data.name}
                            onChange={handleInputChange}
                            name="name"
                            id="name"
                            className="input-style"
                        />
                    </label>

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
                            <Spinner className="loading" animation="border" />
                        ) : (
                            "Registrarse"
                        )}
                        {data.submitted && (
                            <Redirect
                                push
                                to={{
                                    pathname: "/",
                                }}
                            />
                        )}
                    </button>

                    <Link to="/login">Iniciar sesion</Link>

                    {data.errorMessage && (
                        <div className="login-register-fail">
                            {data.errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
