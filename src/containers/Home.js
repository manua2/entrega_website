import React from "react";
import CreateMatch from "../components/CreateMatch";
import { AuthContext } from "../App";
import AvailableMatches from "../components/Home/AvailableMatches/AvailableMatches";
import MatchHistory from "../components/Home/MatchHistory/MatchHistory";
import "../estilos/styles.scss"

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
            <AvailableMatches />
            <MatchHistory />
        </div>
    );
};

export default Home;
