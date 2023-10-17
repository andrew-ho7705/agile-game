import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import TimerPage from "./components/TimerPage";
import EstimateScore from "./components/EstimateScore";
import End from "./components/End";
import { useState, createContext } from "react";
import { Amplify }  from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export const GameScoreContext = createContext();
export const GameIterationContext = createContext();
export const TimerContext = createContext();
export const EstimateContext = createContext();
export const TeamNameContext = createContext();
export const scoreTable = [
    { estimatedScore: 0, ballsInBox: 0, defects: 0, totalScore: 0, delta: 0 },
    { estimatedScore: 0, ballsInBox: 0, defects: 0, totalScore: 0, delta: 0 },
    { estimatedScore: 0, ballsInBox: 0, defects: 0, totalScore: 0, delta: 0 },
    { estimatedScore: 0, ballsInBox: 0, defects: 0, totalScore: 0, delta: 0 },
    { estimatedScore: 0, ballsInBox: 0, defects: 0, totalScore: 0, delta: 0 },
];

function App() {
    const [gameScore, setGameScore] = useState(scoreTable);
    const [gameIteration, setGameIteration] = useState(1);
    const [typeOfTimer, setTypeOfTimer] = useState("");
    const [estimate, setEstimate] = useState(0);
    const [teamName, setTeamName] = useState("");

    return (
        <GameScoreContext.Provider value={[gameScore, setGameScore]}>
            <GameIterationContext.Provider
                value={[gameIteration, setGameIteration]}
            >
                <TimerContext.Provider value={[typeOfTimer, setTypeOfTimer]}>
                    <EstimateContext.Provider value={[estimate, setEstimate]}>
                        <TeamNameContext.Provider
                            value={[teamName, setTeamName]}
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/game" element={<Game />} />
                                <Route
                                    path="/estimate"
                                    element={<EstimateScore />}
                                />
                                <Route
                                    path="/game/timer1"
                                    element={
                                        <TimerPage
                                            timeInSeconds={30}
                                            soundEnabled={true}
                                        />
                                    }
                                />
                                <Route
                                    path="/game/timer2"
                                    element={
                                        <TimerPage
                                            timeInSeconds={15}
                                            soundEnabled={true}
                                        />
                                    }
                                />
                                <Route path="/end" element={<End />} />
                            </Routes>
                        </TeamNameContext.Provider>
                    </EstimateContext.Provider>
                </TimerContext.Provider>
            </GameIterationContext.Provider>
        </GameScoreContext.Provider>
    );
}

export default App;
