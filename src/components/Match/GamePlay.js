import React from "react";
import { AuthContext } from "../../App";
import "../estilos/input-styles.css";

const GamePlay = (props) => {
    const { state: authState } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);

    const moveRequest = {
        match_id: props.match._id,
        move: ""
    };

    const onClick = (move) => {
        moveRequest.move = move

        dispatch({
            type: "MOVE",
        });

        fetch(
            `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/playMatch`,
            {
                method: "post",
                headers: {
                    Authorization: authState.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(moveRequest),
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
                    type: "MOVE_DISPATCHED",
                });
                console.log(move);
            })
            .catch((error) => {
                dispatch({
                    type: "FAILED_TO_DISPATCH_MOVE",
                });
            });
    };

    return (
        <div>
            <button onClick={() => onClick('pierda')}>pierda</button>
            <button onClick={() => onClick('papel')}>papel</button>
            <button onClick={() => onClick('tijera')}>tijera</button>
            <p>fd</p>
        </div>
    );
};

export default GamePlay;

// var turn;
// if (
//     state.match.firstMove === undefined &&
//     state.match.player === authState.user.email
// ) {
//     turn = true;
// }
