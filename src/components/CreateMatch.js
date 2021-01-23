import React from "react";
import { AuthContext } from "../App";
import "./estilos/input-styles.css";

const CreateMatch = (props) => {
    const { state: authState } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);

    const [opponent, setOpponent] = React.useState("");
    const player = authState.user.email;

    const onClose = (e) => {
        props.onClose && props.onClose(e);
    };

    const onSubmit = () => {
        dispatch({
            type: "CREATE_MATCH",
        });

        const match = {
            player,
            opponent,
        };

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
            });
    };

    if (!props.show) {
        return null;
    }

    return (
        <div className="outer">
            <div className="middle">
                <div className="inner">
                    <div className="create-match">
                        <form>
                            <div className="modal-form-inputs">
                                <label
                                    htmlFor="opponent"
                                    className="input-label"
                                >
                                    opponent
                                </label>
                                <input
                                    id="opponent"
                                    name="opponent"
                                    type="text"
                                    value={opponent}
                                    onChange={(e) =>
                                        setOpponent(e.target.value)
                                    }
                                    className="input-style"
                                />
                            </div>
                            <div className="form-action clearfix">
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMatch;
