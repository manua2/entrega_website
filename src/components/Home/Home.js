import "../estilos/home.css";
import React from "react";
import CreateMatch from "../CreateMatch";
import { AuthContext } from "../../App";

export const Home = () => {
    const [
        isCreateMatchModalVisible,
        setCreateMatchModalVisibility,
    ] = React.useState(false);
    
    const { state: authState } = React.useContext(AuthContext);

    const toggleCreateMatch = () => {
        setCreateMatchModalVisibility(!isCreateMatchModalVisible);
    };

    console.log(authState)

    return (
        <div>
            {authState.isAuthenticated && (
                <>
                    <button
                        className="toggle-button"
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

            <p>hola</p>
        </div>
    );
};

export default Home;
