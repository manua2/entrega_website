import React from "react";
import Register from "./components/Register"
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
            {/* <Header /> */}
            <main className="app">
                {console.log(state.isAuthenticated)}
                {/* {!state.isAuthenticated ? <Login /> : <Home />} */}
                <Router>

                    <div className="App">
                        <Switch>
                            <Route path="/login" exact>
                                <Login />
                            </Route>
                            <Route path="/register" exact>
                                <Register />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </main>
        </AuthContext.Provider>
    );
}

export default App;
