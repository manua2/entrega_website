import React from "react";
import { AuthContext } from "../../../App";
import "../../../estilos/matches.css";
import { Link } from "react-router-dom";
import "../../../estilos/gamePlay.css";

export const MatchCard = ({ match }) => {
    const { state: authState } = React.useContext(AuthContext);

    var emailDeOponente;
    if (match.opponent === authState.user.email) {
        emailDeOponente = match.player;
    } else {
        emailDeOponente = match.opponent;
    }

    return (
        <div className="card">
            <div className="card-padding">
                <div className="content">
                    <div className="match-info-second">
                        <p className="match-text">Match ID: {match._id}</p>
                        <span className="match-text">
                            Oponente: {emailDeOponente}
                        </span>
                        <p className="match-text">Ganador: {match.winner}</p>
                    </div>
                    <div>
                        <Link
                            className="boton-jugar boton-mobile boton-ver-partida"
                            to={`/match/${match._id}`}
                        >
                            <p className="p-sin-margen-600">Ver partida</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;
