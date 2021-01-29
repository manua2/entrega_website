import React from "react";
import { AuthContext } from "../App";
import "./estilos/navigation.css";
import { Link } from "react-router-dom";

export const Header = () => {
    const { state, dispatch } = React.useContext(AuthContext);

    return (
        <div>
            <nav className="navigation">
                <h2>
                    <Link className="titulo" to="/">
                        Piedra, papel o tijera
                    </Link>
                </h2>

                {state.isAuthenticated ? (
                    <div className="height-100">
                        <p className="greet">Hola {state.user.name}!</p>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "LOGOUT",
                                })
                            }
                        >
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <div className="height-100">
                        <Link className="login" to="/register">
                            <button className="header-button">
                                Crear cuenta
                            </button>
                        </Link>
                        <Link className="login" to="/login">
                            <button className="header-button">
                                Iniciar sesion
                            </button>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
