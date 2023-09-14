import { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { getTime } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import sfx from "../sounds/mixkit-alert-alarm-1005.mp3";
import {
    GameScoreContext,
    GameIterationContext,
    TimerContext,
    EstimateContext,
} from "../App";

const TimerPage = ({ timeInSeconds, soundEnabled }) => {
    const [time, setTime] = useState(timeInSeconds);
    const [typeOfTimer] = useContext(TimerContext);
    const navigate = useNavigate();
    const audio = useMemo(() => new Audio(sfx), []);
    const [, setGameScore] = useContext(GameScoreContext);
    const [gameIteration, setGameIteration] = useContext(GameIterationContext);
    const [estimateScore, setEstimateScore] = useContext(EstimateContext);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (Math.round(time * 10) / 10 >= 0.1) {
                setTime((time) => time - 1);
                return;
            }
        }, 1000);

        if (Math.round(time * 10) / 10 === 0) {
            setTime(0);
            if (soundEnabled) audio.play();
            return;
        }

        return () => {
            clearInterval(timerId);
        };
    }, [time, navigate, timeInSeconds, audio, soundEnabled]);

    return (
        <div className="text-center py-56">
            <div className="text-8xl">{getTime(time)}</div>
            {!soundEnabled && (
                <div className="flex flex-col justify-center items-center">
                    <div className="text-4xl">
                        Estimate How Many Points Your Team Will Score In
                        Iteration 1!
                    </div>
                    <input
                        type="text"
                        id="estimate"
                        className="border border-black w-64 h-24 text-center text-6xl"
                        placeholder={estimateScore}
                        onChange={(e) =>
                            setEstimateScore(parseInt(e.target.value))
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (isNaN(estimateScore)) {
                                    alert("Error: Estimate must be a number!");
                                    return;
                                }
                                setGameScore((prevGameScore) => {
                                    return prevGameScore.map((score, index) => {
                                        if (index === 0) {
                                            return {
                                                ...score,
                                                estimatedScore: parseInt(
                                                    e.target.value
                                                ),
                                            };
                                        } else {
                                            return score;
                                        }
                                    });
                                });
                                navigate("/game");
                            }
                        }}
                    ></input>
                </div>
            )}
            <div className="text-4xl"> {time === 0 ? "Time's Up!" : ""}</div>
            {time === 0 && soundEnabled ? (
                <Link
                    to="/game"
                    className="text-3xl px-5"
                    onClick={
                        typeOfTimer === "oneMin"
                            ? () => {
                                  audio.pause();
                                  setGameIteration(gameIteration + 1);
                                  setGameScore((prevGameScore) => {
                                      return prevGameScore.map(
                                          (score, index) => {
                                              console.log(index);
                                              if (index === gameIteration - 1) {
                                                  return {
                                                      ...score,
                                                      delta:
                                                          prevGameScore[index]
                                                              .defects === 0 ||
                                                          isNaN(
                                                              prevGameScore[
                                                                  index
                                                              ].defects
                                                          )
                                                              ? 0
                                                              : -1 *
                                                                (prevGameScore[
                                                                    index
                                                                ]
                                                                    .estimatedScore -
                                                                    prevGameScore[
                                                                        index
                                                                    ]
                                                                        .ballsInBox +
                                                                    prevGameScore[
                                                                        index
                                                                    ].defects),

                                                      totalScore:
                                                          prevGameScore[index]
                                                              .defects === 0 ||
                                                          isNaN(
                                                              prevGameScore[
                                                                  index
                                                              ].defects
                                                          )
                                                              ? 0
                                                              : prevGameScore[
                                                                    index
                                                                ].ballsInBox -
                                                                prevGameScore[
                                                                    index
                                                                ].defects,
                                                  };
                                              } else {
                                                  return score;
                                              }
                                          }
                                      );
                                  });
                              }
                            : () => {
                                  audio.pause();
                                  setGameScore((prevGameScore) => {
                                      return prevGameScore.map(
                                          (score, index) => {
                                              if (index === gameIteration - 1) {
                                                  return {
                                                      ...score,
                                                      estimatedScore:
                                                          prevGameScore[index]
                                                              .estimatedScore,
                                                  };
                                              } else {
                                                  return score;
                                              }
                                          }
                                      );
                                  });
                              }
                    }
                >
                    Next
                </Link>
            ) : time === 0 && !soundEnabled ? (
                <div className="text-3xl px-5">Press Enter to Continue!</div>
            ) : null}
        </div>
    );
};
export default TimerPage;
