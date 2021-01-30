import React from "react";
import { AuthContext } from "../../../App";
import MatchCard from "./MatchCard";

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
            `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/getMatches`,
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
                    <span className="loader">Cargando...</span>
                ) : (
                    <>
                        {state.matches.length > 0 &&
                            state.matches.map((match) => (
                                <MatchCard key={match._id} match={match} />
                            ))}
                    </>
                )}
            </div>
        </React.Fragment>
    );
};

export default MatchHistory;