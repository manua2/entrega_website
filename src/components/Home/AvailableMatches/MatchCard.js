import React from "react";
import { AuthContext } from "../../../App";
import "../../estilos/matches.css";
import { Link } from "react-router-dom";

export const Match = ({ match }) => {
    const { state: authState } = React.useContext(AuthContext);

    var emailDeOponente;
    if (match.opponent === authState.user.email) {
        emailDeOponente = match.player;
    } else {
        emailDeOponente = match.opponent;
    }

    return (
        <div className="card">
            <div className="content">
                <p className="match-text">Match ID: {match._id}</p>
                <span className="match-text">Oponente: {emailDeOponente}</span>
                <Link className="boton-jugar" to={`/match/${match._id}`}><p className="p-sin-margen-600">Jugar</p></Link>
            </div>
        </div>
    );
};

export default Match;
