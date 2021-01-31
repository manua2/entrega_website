import "../estilos/home.css";
import React from "react";
import CreateMatch from "../CreateMatch";
import { AuthContext } from "../../App";
import AvailableMatches from "./AvailableMatches/AvailableMatches";
import MatchHistory from "./MatchHistory/MatchHistory";

export const Home = () => {
    const [
        isCreateMatchModalVisible,
        setCreateMatchModalVisibility,
    ] = React.useState(false);

    const { state: authState } = React.useContext(AuthContext);

    const toggleCreateMatch = () => {
        setCreateMatchModalVisibility(!isCreateMatchModalVisible);
    };

    return (
        <div>
            {authState.isAuthenticated && (
                <>
                    <button
                        className="button-match"
                        onClick={toggleCreateMatch}
                    >
                        Crear partida
                    </button>
                    <CreateMatch
                        onClose={toggleCreateMatch}
                        show={isCreateMatchModalVisible}
                    />
                </>
            )}
            <div className='seccion'>
                <div className='titulo-seccion'>Paridas disponibles:</div>
                <AvailableMatches />
            </div>
            <div className='seccion'>
                <div className='titulo-seccion'>Historial de partidas:</div>
                <MatchHistory />
            </div>
        </div>
    );
};

export default Home;
