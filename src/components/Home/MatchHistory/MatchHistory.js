import React from "react";
import { AuthContext } from "../../../App";
import MatchCard from "./MatchCard";
import "../../estilos/home.css";
import "../estilos/input-styles.css";

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

const MatchHistory = () => {
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const user = authState.user.email;

    const getMatchesReq = {
        user: user,
        finishedMatch: "true",
    };

    React.useEffect(() => {
        dispatch({
            type: "FETCH_MATCHES_REQUEST",
        });

        fetch(
            `https://cors-anywhere.herokuapp.com/https://entregafinalpptapi.herokuapp.com/getMatches`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ getMatchesReq }),
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
                        <span className="cargando"></span>
                    </div>
                ) : (
                    <>
                        {state.matches.length > 0 && (
                            <div className="seccion">
                                <div className="titulo-seccion">
                                    Historial de partidas:
                                </div>
                                {state.matches.map((match) => (
                                    <MatchCard key={match._id} match={match} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </React.Fragment>
    );
};

export default MatchHistory;
