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
    TeamNameContext,
} from "../App";

const TimerPage = ({ timeInSeconds, soundEnabled }) => {
    const [time, setTime] = useState(timeInSeconds);
    const [typeOfTimer] = useContext(TimerContext);
    const navigate = useNavigate();
    const audio = useMemo(() => new Audio(sfx), []);
    const [, setGameScore] = useContext(GameScoreContext);
    const [gameIteration, setGameIteration] = useContext(GameIterationContext);
    const [, setEstimateScore] = useContext(EstimateContext);
    const [teamName, setTeamName] = useContext(TeamNameContext);

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
        <div className="text-center py-40 text-slate-50">
            <div className="text-9xl">{getTime(time)}</div>
            {!soundEnabled && (
                <div className="flex flex-col justify-center items-center">
                    <div className="text-5xl w-4/5 mb-10">
                        Enter Your Team Name and Estimate How Many Points You
                        Will Score In Iteration 1!
                    </div>
                    <div className="flex flex-row mb-10">
                        <span className="text-4xl mx-2 mt-2">Team Name:</span>
                        <input
                            autoComplete="false"
                            type="text"
                            className="border border-black rounded-lg w-fit h-16 text-center text-3xl "
                            placeholder="Enter Team Name..."
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <span className="text-4xl mx-2 mt-2">
                            Estimated Score:
                        </span>
                        <input
                            autoComplete="false"
                            type="number"
                            className="border border-black rounded-lg w-44 h-16 text-center text-6xl"
                            onChange={(e) => {
                                setEstimateScore(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value));
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
                            }}
                        />
                    </div>
                </div>
            )}
            <div className="text-6xl"> {time === 0 ? "Time's Up!" : ""}</div>
            {time === 0 && soundEnabled ? (
                <Link
                    to="/game"
                    className="text-6xl px-5"
                    onClick={
                        typeOfTimer === "oneMin"
                            ? () => {
                                  audio.pause();
                                  setGameIteration(gameIteration + 1);
                                  setGameScore((prevGameScore) => {
                                      return prevGameScore.map(
                                          (score, index) => {
                                              if (index === gameIteration - 1) {
                                                  return {
                                                      ...score,
                                                      delta:
                                                          -1 *
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
                                                          prevGameScore[
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
                <Link to="/game" className="text-5xl px-5">Press Here to Continue!</Link>
            ) : null}
        </div>
    );
};
export default TimerPage;
