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
                    <div>
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
                    <div>
                        <Link className="login" to="/register">
                            Crear cuenta
                        </Link>
                        <Link className="login" to="/login">
                            Iniciar sesion
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
