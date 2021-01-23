import React from "react";
import { AuthContext } from "../App";
import "./navigation.css";
import { Link } from "react-router-dom";

export const Header = () => {
    const { state, dispatch } = React.useContext(AuthContext);

    return (
        <div>
            <nav className="navigation">
                <h1>Piedra, papel o tijera</h1>

                {state.isAuthenticated ? (
                    <button
                        onClick={() =>
                            dispatch({
                                type: "LOGOUT",
                            })
                        }
                    >
                        Cerrar sesión
                    </button>
                ) : (
                    <div>
                        <Link className="login" to="/register">Crear cuenta</Link>
                        <Link className="login" to="/login">Iniciar sesion</Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
