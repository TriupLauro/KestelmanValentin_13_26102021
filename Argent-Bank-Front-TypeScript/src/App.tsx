import './styles/main.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import {store} from "./store/store";
import {Provider} from "react-redux";

function App() {

  return (
      <Provider store={store}>
          <Router>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/sign-in" element={<SignInPage />} />
              </Routes>
          </Router>
      </Provider>
  )
}

export default App
