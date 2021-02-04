import React from "react";
import { AuthContext } from "../../../App";
import { Link } from "react-router-dom";
import "../../../estilos/styles.scss"

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
                        <p className="match-text">
                            Oponente: {emailDeOponente}
                        </p>
                    </div>

                    <Link
                        className="boton-jugar boton-mobile"
                        to={`/match/${match._id}`}
                    >
                        <p className="p-sin-margen-600">Jugar</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;
