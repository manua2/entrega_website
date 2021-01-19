import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../App"

export const Login = () => {
    const { dispatch } = React.useContext(AuthContext);

    const initialState = {
        name: "",
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
            `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/register`,
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
            })
            .catch((error) => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: "MAL",
                });
            });
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <h1>Inicio de sesión</h1>

                <label htmlFor="name">
                    Nombre
                    <input
                        type="text"
                        value={data.name}
                        onChange={handleInputChange}
                        name="name"
                        id="name"
                    />
                </label>

                <label htmlFor="email">
                    Email
                    <input
                        type="text"
                        value={data.email}
                        onChange={handleInputChange}
                        name="email"
                        id="email"
                    />
                </label>

                <label htmlFor="password">
                    Contraseña
                    <input
                        type="password"
                        value={data.password}
                        onChange={handleInputChange}
                        name="password"
                        id="password"
                    />
                </label>

                <button disabled={data.isSubmitting}>
                    {data.isSubmitting ? (
                        <img alt="loading icon" />
                    ) : (
                        "Registrarse"
                    )}
                </button>

                {data.errorMessage && <span>{data.errorMessage}</span>}
            </form>
        </div>
    );
};

export default Login;
