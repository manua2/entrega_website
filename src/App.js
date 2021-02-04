import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./containers/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Match from "./containers/Match";
// import "./estilos/app.css";
import "./estilos/styles.scss";

export const AuthContext = React.createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.user.token);

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.user.token,
            };
        case "REGISTER":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.user.token);

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.user.token,
            };
        case "LOGOUT":
            localStorage.clear();

            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (user && token) {
            dispatch({
                type: "LOGIN",
                payload: {
                    user,
                    token,
                },
            });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            <main className="app">
                <Router>
                    <Header />
                    <div className="App">
                        <Switch>
                            <Route path="/" exact>
                                {!state.isAuthenticated ? <Login /> : <Home />}
                            </Route>
                            <Route path="/login" exact>
                                <Login />
                            </Route>
                            <Route path="/register" exact>
                                <Register />
                            </Route>
                            <Route path="/match/:id">
                                {!state.isAuthenticated ? <Login /> : <Match />}
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </main>
        </AuthContext.Provider>
    );
}

export default App;
