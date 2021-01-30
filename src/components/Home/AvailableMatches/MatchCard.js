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

    console.log(match)

    return (
        <div className="card">
            <div className= "card-padding">
                <div className="content">
                    <p className="match-text">Match ID: {match._id}</p>
                    <span className="match-text">
                        Oponente: {emailDeOponente}
                    </span>
                    <Link className="boton-jugar boton-mobile" to={`/match/${match._id}`}>
                        <p className="p-sin-margen-600">Jugar</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Match;
