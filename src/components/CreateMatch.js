import React from "react";
import { AuthContext } from "../App";
import "./estilos/input-styles.css";

const CreateMatch = (props) => {
    const { state: authState } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const [opponent, setOpponent] = React.useState("");
    const player = authState.user.email;

    const onClose = (e) => {
        props.onClose && props.onClose(e);
    };

    function testEmail(x) {
        if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            x
        )) {
            return true
        } else {
            return false
        }
    }

    // const submitDefault = (e) => {
    //     e.preventDefault();
    // }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: "CREATE_MATCH",
        });

        const match = {
            player,
            opponent,
        };

        const email = document.getElementById("opponent").value;
        console.log(email)
        var invalidEmail;
        if (!testEmail(email)) {
            invalidEmail = true;
        } else if (testEmail(email)) {
            invalidEmail = false;
        }

        fetch(
            `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/match`,
            {
                method: "post",
                headers: {
                    Authorization: authState.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(match),
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((data) => {
                setOpponent("");

                dispatch({
                    type: "MATCH_CREATED",
                    payload: data.match,
                });

                onClose();
            })
            .catch((error) => {
                dispatch({
                    type: "FAILED_TO_CREATE_MATCH",
                });
                if (invalidEmail === true) {
                    setErrorMessage("Email invalido");
                } else if (error.status === 403) {
                    setErrorMessage("Ese es tu email")
                } else {
                    setErrorMessage("Ese email no esta registrado");
                }
            });
    };

    if (!props.show) {
        return null;
    }

    return (
        <div className="center-div">
            <div className="create-match">
                <form onSubmit={onSubmit}>
                    <div className="modal-form-inputs">
                        <label htmlFor="opponent" className="input-label">
                            Ingresar Email de oponente
                        </label>
                        <input
                            id="opponent"
                            name="opponent"
                            type="text"
                            value={opponent}
                            onChange={(e) => setOpponent(e.target.value)}
                            className="input-style"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            id="overlay-confirm-button"
                            className="button button-primary"
                            onClick={onSubmit}
                        >
                            Crear partida
                        </button>

                        <button
                            type="button"
                            id="overlay-cancel-button"
                            className="button button-default small close-overlay pull-right"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        {errorMessage !== "" && (
                            <div className="login-register-fail">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMatch;
