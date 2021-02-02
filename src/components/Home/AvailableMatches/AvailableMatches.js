import React from "react";
import { AuthContext } from "../../../App";
import MatchCard from "./MatchCard";
import "../../estilos/home.css";
import "../../estilos/input-styles.css";
import apiUrlVariable from "../../apiUrlVariable";

export const AvailableMatchesContext = React.createContext();

const initialState = {
    matches: [],
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
                matches: action.payload.matches,
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

const AvailableMatches = () => {
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const user = authState.user.email;

    const getMatchesReq = {
        user: user,
        finishedMatch: "false",
    };

    React.useEffect(() => {
        dispatch({
            type: "FETCH_MATCHES_REQUEST",
        });

        fetch(`${apiUrlVariable}/getMatches`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ getMatchesReq }),
        })
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

    return (
        <React.Fragment>
            <div>
                {state.isFetching ? (
                    <div className="center-div">
                        <span className="cargando">Cargando...</span>
                    </div>
                ) : (
                    <>
                        {state.matches.length > 0 ? (
                            <div className="seccion">
                                <div className="titulo-seccion">
                                    Paridas disponibles:
                                </div>
                                {state.matches.map((match) => (
                                    <MatchCard key={match._id} match={match} />
                                ))}
                            </div>
                        ) : (
                            <div className="titulo-seccion no-hay-partidas-mensaje">
                                <div>No hay partidas disponibles</div>
                                <div>
                                    Pueden ser creadas con el boton "Crear
                                    partida"
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </React.Fragment>
    );
};

export default AvailableMatches;
