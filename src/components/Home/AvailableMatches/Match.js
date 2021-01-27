import React from "react"
import { AuthContext } from "../../../App";
import "../../estilos/matches.css"

export const Match = ({ match }) => {
    const { state: authState } = React.useContext(AuthContext);

    var emailDeOponente;
    if (match.opponent === authState.user.email) {
        emailDeOponente = match.player
    } else {
        emailDeOponente = match.opponent
    }

    return (
        <div className="card">

            <div className="content">
                <p className="match-text">Match ID: {match._id}</p>
                <span className="match-text">Oponente: {emailDeOponente}</span>
            </div>
        </div>
    )
}

export default Match