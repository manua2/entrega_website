import React from "react";
import { AuthContext } from "../../App";
import { useParams } from "react-router-dom";
import "../estilos/matches.css";
import "../estilos/input-styles.css";
import GamePlay from "./GamePlay"

const initialState = {
    match: [],
    isFetching: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_MATCHES_REQUEST":
            return {
                ...state,
                isFetching: true,
            };
        case "FETCH_MATCHES_SUCCESS":
            return {
                ...state,
                isFetching: false,
                match: action.payload.match,
            };
        case "FETCH_MATCHES_FAILURE":
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
};

export const Match = () => {
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    var { id } = useParams();

    React.useEffect(() => {
        dispatch({
            type: "FETCH_MATCHES_REQUEST",
        });

        fetch(
            `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/match/${id}`
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((data) => {
                dispatch({
                    type: "FETCH_MATCHES_SUCCESS",
                    payload: data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: "FETCH_MATCHES_FAILURE",
                });
            });
        // eslint-disable-next-line
    }, [authState.token]);

    var emailDeOponente;
    if (state.match.opponent === authState.user.email) {
        emailDeOponente = state.match.player;
    } else {
        emailDeOponente = state.match.opponent;
    }

    var usuarioNoEnLaPartida;
    if (
        state.match.player !== authState.user.email &&
        state.match.opponent !== authState.user.email
    ) {
        usuarioNoEnLaPartida = true;
    } else {
        usuarioNoEnLaPartida = false;
    }

    return (
        <React.Fragment>
            <div>
                {state.isFetching ? (
                    <span className="center-div">Cargando...</span>
                ) : usuarioNoEnLaPartida ? (
                    <span className="error">Ocurrió un error</span>
                ) : (
                    <>
                        <div className="match-info">
                            <p className="p-sin-margen-600">
                                Jugador: {authState.user.email}
                            </p>
                            <p className="p-sin-margen-600">
                                Oponente: {emailDeOponente}
                            </p>
                        </div>
                        <GamePlay match={state.match} />
                    </>
                )}
            </div>
        </React.Fragment>
    );
};

export default Match;
