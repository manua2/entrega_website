import React from "react";
import { AuthContext } from "../../App";
import { useParams } from "react-router-dom";
import "../estilos/matches.css";
import "../estilos/input-styles.css";
import GamePlay from "./GamePlay";
import { Redirect } from "react-router";

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

    var matchExists;
    if (state.match === null) {
        matchExists = false;
    } else {
        matchExists = true;
        var usuarioNoEnLaPartida;
        if (
            state.match.player !== authState.user.email &&
            state.match.opponent !== authState.user.email
        ) {
            usuarioNoEnLaPartida = true;
        } else {
            usuarioNoEnLaPartida = false;
        }
    }

    console.log(matchExists)

    return (
        <React.Fragment>
            <div>
                {matchExists ? (
                    state.isFetching ? (
                        <div className="center-div">
                            <span className="cargando">Cargando...</span>
                        </div>
                    ) : usuarioNoEnLaPartida ? (
                        <div className="center-div">
                            <span className="error">Ocurrió un error</span>
                        </div>
                    ) : (
                        <>
                            <div className="match-info">
                                <p className="p-sin-margen-600">
                                    Creador de la partida: {state.match.player}
                                </p>
                                <p className="p-sin-margen-600">
                                    Oponente: {state.match.opponent}
                                </p>
                            </div>
                            <GamePlay match={state.match} />
                        </>
                    )
                ) : (
                    <Redirect
                        push
                        to={{
                            pathname: "/",
                        }}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default Match;
