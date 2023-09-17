import { useContext } from "react";
import { Link } from "react-router-dom";
import ScoreTable from "./ScoreTable";
import { TimerContext, GameIterationContext, TeamNameContext } from "../App";

const Game = () => {
    const [typeOfTimer, setTypeOfTimer] = useContext(TimerContext);
    const [gameIteration] = useContext(GameIterationContext);
    const [teamName] = useContext(TeamNameContext);

    function handleRadioClick() {
        const option1 = document.getElementById("One Minute Timer");
        const option2 = document.getElementById("Two Minute Timer");

        option1.addEventListener("change", () => {
            if (option1.checked) option2.checked = false;
        });

        option2.addEventListener("change", () => {
            if (option2.checked) option1.checked = false;
        });
    }

    return (
        <div className="flex flex-row h-screen justify-center text-slate-50">
            <div>
                <span className="text-3xl">{teamName}</span>
                <div>
                    <ScoreTable />
                    <footer className="absolute bottom-0 ml-80 px-24 mb-5">
                        <div>
                            <ul className="px-5 text-3xl">
                                <input
                                    autoComplete="false"
                                    type="radio"
                                    id="Two Minute Timer"
                                    className="text-6xl mx-2 h-5 w-5"
                                    onClick={() => {
                                        setTypeOfTimer("twoMin");
                                        handleRadioClick();
                                    }}
                                />
                                Two Minute Timer
                                <input
                                    autoComplete="false"
                                    type="radio"
                                    id="One Minute Timer"
                                    className="mx-2 h-5 w-5"
                                    onClick={() => {
                                        setTypeOfTimer("oneMin");
                                        handleRadioClick();
                                    }}
                                />
                                One Minute Timer
                            </ul>
                            <div className="flex flex-col">
                                {gameIteration <= 5 ? (
                                    <Link
                                        to={
                                            typeOfTimer === "oneMin"
                                                ? "timer2"
                                                : typeOfTimer === ""
                                                ? null
                                                : "timer1"
                                        }
                                        className="text-6xl flex justify-center"
                                    >
                                        Start
                                    </Link>
                                ) : (
                                    <Link
                                        to="/end"
                                        className="text-6xl flex justify-center"
                                    >
                                        End
                                    </Link>
                                )}
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Game;
