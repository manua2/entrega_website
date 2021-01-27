import "../estilos/home.css";
import React from "react";
import CreateMatch from "../CreateMatch";
import { AuthContext } from "../../App";
import AvailableMatches from "./AvailableMatches/AvailableMatches"

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
            <AvailableMatches></AvailableMatches>
            <p className="test">hola</p>
        </div>
    );
};

export default Home;
