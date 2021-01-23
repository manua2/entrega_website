import "./estilos/home.css"
import React from "react"
import { AuthContext } from "../App"

const reducer = (state, action) => {
    switch (action.type) {
        case "MATCH_RECEIVED":
            
        default:
            return state
    }
}

export const Home = () => {
    const { state: authState } = React.useContext(AuthContext)

    const initialState = {
        player: state.user,
        opponent: '',
    };

    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <p>poop</p>
    )
}

export default Home