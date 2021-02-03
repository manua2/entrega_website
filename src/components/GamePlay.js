import React from "react";
import { AuthContext } from "../App";
import "./estilos/input-styles.css";
import "./estilos/gamePlay.css";
import apiUrlVariable from "./apiUrlVariable";

const GamePlay = (props) => {
    const { state: authState } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(AuthContext);

    const moveRequest = {
        match: props.match,
        move: "",
    };

    function refreshPage() {
        window.location.reload(false);
    }

    const onClick = (move) => {
        moveRequest.move = move;

        dispatch({
            type: "MOVE",
        });

        fetch(`${apiUrlVariable}/playMatch`, {
            method: "post",
            headers: {
                Authorization: authState.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(moveRequest),
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
                    type: "MOVE_DISPATCHED",
                });
                refreshPage();
            })
            .catch((error) => {
                dispatch({
                    type: "FAILED_TO_DISPATCH_MOVE",
                });
            });
    };

    const finishMatchReq = {
        match: props.match,
        finishedMatch: true,
        winner: "",
    };

    const finishMatch = (winner) => {
        finishMatchReq.winner = winner;

        dispatch({
            type: "FINISH_MATCH",
        });

        fetch(
            `${apiUrlVariable}/playMatch`,
            {
                method: "post",
                headers: {
                    Authorization: authState.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finishMatchReq),
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
                    type: "MATCH_FINISHED",
                });
            })
            .catch((error) => {
                dispatch({
                    type: "FAILED_TO_FINISH_MATCH",
                });
            });
    };

    var showButton;
    if (
        props.match.move_1_1 === " " &&
        props.match.player !== authState.user.email
    ) {
        showButton = false;
    } else if (
        props.match.move_1_1 === " " &&
        props.match.player === authState.user.email
    ) {
        showButton = true;
    } else if (
        props.match.move_1_2 === " " &&
        props.match.player === authState.user.email
    ) {
        showButton = false;
    } else if (
        props.match.move_1_2 === " " &&
        props.match.player !== authState.user.email
    ) {
        showButton = true;
    } else if (
        props.match.move_2_1 === " " &&
        props.match.player === authState.user.email
    ) {
        showButton = true;
    } else if (
        props.match.move_2_1 === " " &&
        props.match.player !== authState.user.email
    ) {
        showButton = false;
    } else if (
        props.match.move_2_2 === " " &&
        props.match.player === authState.user.email
    ) {
        showButton = false;
    } else if (
        props.match.move_2_2 === " " &&
        props.match.player !== authState.user.email
    ) {
        showButton = true;
    } else if (
        props.match.move_3_1 === " " &&
        props.match.player === authState.user.email
    ) {
        showButton = true;
    } else if (
        props.match.move_3_1 === " " &&
        props.match.player !== authState.user.email
    ) {
        showButton = false;
    } else if (
        props.match.move_3_2 === " " &&
        props.match.player !== authState.user.email
    ) {
        showButton = true;
    } else if (
        props.match.move_3_2 === " " &&
        props.match.player === authState.user.email
    ) {
        showButton = false;
    }

    var hayJugadas;
    if (
        props.match.move_1_1 === " " &&
        props.match.move_1_2 === " " &&
        props.match.move_2_1 === " " &&
        props.match.move_2_2 === " " &&
        props.match.move_3_1 === " " &&
        props.match.move_3_2 === " "
    ) {
        hayJugadas = false;
    } else {
        hayJugadas = true;
    }

    var hayPrimerasDosJugadas;
    if (props.match.move_1_1 !== " " && props.match.move_1_2 !== " ") {
        hayPrimerasDosJugadas = true;
    } else {
        hayPrimerasDosJugadas = false;
    }

    var haySegundasDosJugadas;
    if (props.match.move_2_1 !== " " && props.match.move_2_2 !== " ") {
        haySegundasDosJugadas = true;
    } else {
        haySegundasDosJugadas = false;
    }

    var hayTercerasDosJugadas;
    if (props.match.move_3_1 !== " " && props.match.move_3_2 !== " ") {
        hayTercerasDosJugadas = true;
    } else {
        hayTercerasDosJugadas = false;
    }

    const gameLogic = (x, y) => {
        var result;
        if (x === "Piedra" && y === "Tijera") {
            result = x;
        } else if (x === "Piedra" && y === "Papel") {
            result = y;
        } else if (x === "Papel" && y === "Piedra") {
            result = x;
        } else if (x === "Papel" && y === "Tijera") {
            result = y;
        } else if (x === "Tijera" && y === "Papel") {
            result = x;
        } else if (x === "Tijera" && y === "Piedra") {
            result = y;
        } else if (x === y) {
            result = "empate";
        }

        return result;
    };

    var partidaContinua = true;

    const matchWinner = (x, y, z) => {
        var winner;
        if (x === y) {
            winner = x;
        } else if (x !== y && x === z) {
            winner = x;
        } else if (x !== y && y === z) {
            winner = y;
        } else if (x === "Empate" && y === "Empate") {
            winner = "Empate";
        } else if (x === "Empate" && z === "Empate") {
            winner = "Empate";
        } else if (y === "Empate" && z === "Empate") {
            winner = "Empate";
        } else if (x !== y && z === "Empate") {
            winner = "Empate";
        } else if (x !== z && y === "Empate") {
            winner = "Empate";
        } else if (y !== z && x === "Empate") {
            winner = "Empate";
        }

        return winner;
    };

    var winnerResult;
    var partidaTerminada = false;

    if (props.match.move_1_1 !== " " && props.match.move_1_2 !== " ") {
        var gameOneWinner;
        if (
            gameLogic(props.match.move_1_1, props.match.move_1_2) ===
            props.match.move_1_1
        ) {
            gameOneWinner = props.match.player;
        } else if (
            gameLogic(props.match.move_1_1, props.match.move_1_2) === "empate"
        ) {
            gameOneWinner = "Empate";
        } else if (
            gameLogic(props.match.move_1_1, props.match.move_1_2) ===
            props.match.move_1_2
        ) {
            gameOneWinner = props.match.opponent;
        }
    }

    if (props.match.move_2_1 !== " " && props.match.move_2_2 !== " ") {
        var gameTwoWinner;
        if (
            gameLogic(props.match.move_2_1, props.match.move_2_2) ===
            props.match.move_2_1
        ) {
            gameTwoWinner = props.match.player;
        } else if (
            gameLogic(props.match.move_2_1, props.match.move_2_2) === "empate"
        ) {
            gameTwoWinner = "Empate";
        } else if (
            gameLogic(props.match.move_2_1, props.match.move_2_2) ===
            props.match.move_2_2
        ) {
            gameTwoWinner = props.match.opponent;
        }

        if (gameOneWinner === gameTwoWinner && gameOneWinner !== "Empate") {
            partidaContinua = false;
            winnerResult = matchWinner(gameOneWinner, gameTwoWinner);
            finishMatch(winnerResult);
            partidaTerminada = true;
        } else {
            partidaContinua = true;
        }
    }

    if (props.match.move_3_1 !== " " && props.match.move_3_2 !== " ") {
        var gameThreeWinner;
        if (
            gameLogic(props.match.move_3_1, props.match.move_3_2) ===
            props.match.move_3_1
        ) {
            gameThreeWinner = props.match.player;
            winnerResult = matchWinner(
                gameOneWinner,
                gameTwoWinner,
                gameThreeWinner
            );
            finishMatch(winnerResult);
            partidaTerminada = true;
        } else if (
            gameLogic(props.match.move_3_1, props.match.move_3_2) === "empate"
        ) {
            gameThreeWinner = "Empate";
            winnerResult = matchWinner(
                gameOneWinner,
                gameTwoWinner,
                gameThreeWinner
            );
            finishMatch(winnerResult);
            partidaTerminada = true;
        } else if (
            gameLogic(props.match.move_3_1, props.match.move_3_2) ===
            props.match.move_3_2
        ) {
            gameThreeWinner = props.match.opponent;
            winnerResult = matchWinner(
                gameOneWinner,
                gameTwoWinner,
                gameThreeWinner
            );
            finishMatch(winnerResult);
            partidaTerminada = true;
        }
    }

    return (
        <div>
            {hayJugadas ? (
                <div>
                    {hayPrimerasDosJugadas && (
                        <div className="pares-de-jugadas">
                            <div className="jugadas">
                                <div className="jugada">
                                    {props.match.move_1_1}
                                </div>
                                <div className="jugada">
                                    {props.match.move_1_2}
                                </div>
                            </div>
                            <div className="resultado">
                                <div className="ganador">Ganador:</div>&nbsp;
                                {gameOneWinner}
                            </div>
                        </div>
                    )}
                    {haySegundasDosJugadas && (
                        <div className="pares-de-jugadas">
                            <div className="jugadas">
                                <div className="jugada">
                                    {props.match.move_2_1}
                                </div>
                                <div className="jugada">
                                    {props.match.move_2_2}
                                </div>
                            </div>
                            <div className="resultado">
                                <div className="ganador">Ganador:</div>&nbsp;
                                {gameTwoWinner}
                            </div>
                        </div>
                    )}
                    {hayTercerasDosJugadas && (
                        <div className="pares-de-jugadas">
                            <div className="jugadas">
                                <div className="jugada">
                                    {props.match.move_3_1}
                                </div>
                                <div className="jugada">
                                    {props.match.move_3_2}
                                </div>
                            </div>
                            <div className="resultado">
                                <div className="ganador">Ganador:</div>&nbsp;
                                {gameThreeWinner}
                            </div>
                        </div>
                    )}
                    {partidaTerminada && (
                        <div className="resultado resultado-final">
                            <div className="ganador">
                                Ganador de la partida:
                            </div>
                            &nbsp;{winnerResult}
                        </div>
                    )}
                </div>
            ) : (
                <div className="no-jugadas">No hay jugadas todavia!</div>
            )}

            {showButton && partidaContinua ? (
                <div className="button-div">
                    <button
                        className="button-pick button-piedra"
                        onClick={() => onClick("Piedra")}
                    >
                        Piedra
                    </button>
                    <button
                        className="button-pick"
                        onClick={() => onClick("Papel")}
                    >
                        Papel
                    </button>
                    <button
                        className="button-pick button-tijera"
                        onClick={() => onClick("Tijera")}
                    >
                        Tijera
                    </button>
                </div>
            ) : (
                !partidaTerminada && (
                    <div className="no-turno">No es tu turno!</div>
                )
            )}
        </div>
    );
};

export default GamePlay;
