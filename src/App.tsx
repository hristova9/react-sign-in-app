import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
  return (
    <main id="main-container">
      <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
    </main>
  );
}

export default App;
