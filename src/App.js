import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import TimerPage from "./components/TimerPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game/timer1" element={<TimerPage timeInSeconds={2} />} />
            <Route path="/game/timer2" element={<TimerPage timeInSeconds={1} />} />
        </Routes>
    );
}

export default App;
