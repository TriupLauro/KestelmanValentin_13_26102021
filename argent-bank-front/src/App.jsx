import './styles/main.css'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";

function App() {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/sign-in">
                    <SignIn />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
