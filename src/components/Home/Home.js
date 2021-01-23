import "../estilos/home.css"
import React from "react"
import CreateMatch from "../CreateMatch"

export const Home = () => {
    const [isCreateMatchModalVisible, setCreateMatchModalVisibility] = React.useState(false)

    const toggleCreateMatch = () => {
        setCreateMatchModalVisibility(!isCreateMatchModalVisible)
    }

    return (
        <div>
            <button className="toggle-button" onClick={toggleCreateMatch}>Crear partida</button>
            <CreateMatch onClose={toggleCreateMatch} show={isCreateMatchModalVisible} />
            <p>hola</p>
        </div>
    )
}

export default Home