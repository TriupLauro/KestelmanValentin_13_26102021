import './styles/main.css'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import TransactionsDetails from "./pages/TransactionsDetails";
import React from "react";
import store from "./store/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function App() {

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/sign-in">
                            <SignIn />
                        </Route>
                        <Route path="/user">
                            <User />
                        </Route>
                        <Route path="/transactions">
                            <TransactionsDetails />
                        </Route>
                    </Switch>
                </Router>
            </QueryClientProvider>
        </Provider>
    )
}

export default App
