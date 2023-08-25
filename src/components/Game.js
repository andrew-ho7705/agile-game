import { useState } from "react";
import { Link } from "react-router-dom";

const Game = () => {
    const [typeOfTimer, setTypeOfTimer] = useState("");

    function handleRadioClick() {
        const option1 = document.getElementById("One Minute Timer");
        const option2 = document.getElementById("Two Minute Timer");

        option1.addEventListener("change", () => {
            if (option1.checked) {
                option2.checked = false;
            }
        });

        option2.addEventListener("change", () => {
            if (option2.checked) {
                option1.checked = false;
            }
        });
    }

    return (
        <>
            <div className="align-bottom">
                <input
                    type="radio"
                    value="Two Minute Timer"
                    id="Two Minute Timer"
                    className="bg-slate-800 text-white"
                    onClick={() => {
                        setTypeOfTimer("twoMin");
                        handleRadioClick();
                    }}
                />
                {" Two Minute Timer"}
                <input
                    type="radio"
                    value="One Minute Timer"
                    id="One Minute Timer"
                    className="bg-slate-800 text-white"
                    onClick={() => {
                        setTypeOfTimer("oneMin");
                        handleRadioClick();
                    }}
                />
                {" One Minute Timer"}

                <Link
                    to={typeOfTimer === "oneMin" ? "timer2" : "timer1"}
                    className="text-3xl px-5"
                >
                    Start
                </Link>
                <Link to="/" className="text-3xl px-5">
                    Back To Home
                </Link>
            </div>
        </>
    );
};

export default Game;
