import React from "react";
import { AuthContext } from "../App";
import { useParams } from "react-router-dom";
import GamePlay from "../components/GamePlay";
import { Redirect } from "react-router";
import apiUrlVariable from "../components/apiUrlVariable";
import Spinner from "react-bootstrap/Spinner";
import "../estilos/styles.scss"

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

        fetch(`${apiUrlVariable}/match/${id}`)
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

    return (
        <React.Fragment>
            <div>
                {matchExists ? (
                    state.isFetching ? (
                        <div className="loading-div">
                            <Spinner animation="border" />
                        </div>
                    ) : usuarioNoEnLaPartida ? (
                        <div className="center-div">
                            {/* <span className="error">Ocurrió un error</span> */}
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
