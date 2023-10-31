import { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { formatTime, countBalls } from "../utils/Utils";
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
    const [typeOfTimer, setTypeOfTimer] = useContext(TimerContext);
    const audio = useMemo(() => new Audio(sfx), []);
    const [gameScore, setGameScore] = useContext(GameScoreContext);
    const [gameIteration, setGameIteration] = useContext(GameIterationContext);
    const [, setEstimateScore] = useContext(EstimateContext);
    const [teamName, setTeamName] = useContext(TeamNameContext);
    const [timeTicking, setTimeTicking] = useState(true);
    const [sensorList, setSensorList] = useState([]);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (Math.round(time * 10) / 10 >= 0.1) {
                setTime((time) => time - 0.01);
                return;
            }
        }, 10);

        if (Math.round(time * 10) / 10 === 0) {
            setTime(0);
            setTimeTicking(false);
            if (soundEnabled) audio.play();
            return;
        }

        return () => {
            clearInterval(timerId);
        };
    }, [time, timeInSeconds, audio, soundEnabled, sensorList]);

    useEffect(() => {
        let intervalId;

        if (soundEnabled && typeOfTimer === "oneMin" && time !== 0) {
            intervalId = setInterval(() => {
                setGameScore((prevGameScore) => {
                    const updatedGameScore = [...prevGameScore];
                    updatedGameScore[gameIteration - 1] = {
                        ...updatedGameScore[gameIteration - 1],
                        ballsInBox:
                            updatedGameScore[gameIteration - 1].ballsInBox + 1,
                    };
                    return updatedGameScore;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [
        time,
        gameIteration,
        gameScore,
        soundEnabled,
        setGameScore,
        typeOfTimer,
    ]);

    const endpoint = "http://0.0.0.0:5001/check-beam";

    useEffect(() => {
        if (timeTicking && typeOfTimer === "twoMin" && soundEnabled) {
            fetch(endpoint)
                .then((res) => res.json())
                .then((data) => {
                    if(sensorList[sensorList.length - 1] !== data) {
                        console.log(countBalls(sensorList));
                        setSensorList(list =>[...list, data])
                    }
                })
                .catch((error) =>
                    console.error("Error fetching light status:", error)
                );
        }
    }, [typeOfTimer, gameIteration, setGameScore, timeTicking, time, endpoint, soundEnabled]);

    return (
        <div className="text-center md:py-[60px] lg:py-40 text-slate-50">
            <div className="md:text-7xl lg:text-9xl md:mb-12">
                {formatTime(time)}
            </div>
            {!soundEnabled && (
                <div className="flex flex-col justify-center items-center">
                    <div className="w-4/5 md:mb-10 lg:mb-10 md:text-2xl lg:text-5xl">
                        Enter Your Team Name and Estimate How Many Points You
                        Will Score In Iteration 1!
                    </div>
                    <div className="flex flex-row md:mb-14 lg:mb-10">
                        <input
                            autoComplete="false"
                            type="text"
                            className="border border-black rounded-lg h-fit lg:h-16 text-center text-xl md:text-2xl lg:text-4xl"
                            placeholder="Enter Team Name..."
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <input
                            autoComplete="false"
                            type="number"
                            className="border border-black rounded-lg h-fit text-center md:text-2xl lg:text-4xl"
                            placeholder="Enter Estimated Score..."
                            onChange={(e) => {
                                setEstimateScore(
                                    isNaN(parseInt(e.target.value))
                                        ? 0
                                        : parseInt(e.target.value)
                                );
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
                                                          (prevGameScore[index]
                                                              .estimatedScore -
                                                              prevGameScore[
                                                                  index
                                                              ].ballsInBox +
                                                              prevGameScore[
                                                                  index
                                                              ].defects),

                                                      totalScore:
                                                          prevGameScore[index]
                                                              .ballsInBox -
                                                          prevGameScore[index]
                                                              .defects,
                                                  };
                                              } else {
                                                  return score;
                                              }
                                          }
                                      );
                                  });
                                  setTypeOfTimer("");
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
                                                        ballsInBox: countBalls(sensorList)
                                                  };
                                              } else {
                                                  return score;
                                              }
                                          }
                                      );
                                  });
                                  setSensorList([]);
                                  setTypeOfTimer("");
                              }
                    }
                >
                    Next
                </Link>
            ) : time === 0 && !soundEnabled ? (
                <Link
                    to="/game"
                    className="px-5 text-3xl md:text-4xl lg:text-5xl"
                >
                    Press Here to Continue!
                </Link>
            ) : null}
        </div>
    );
};
export default TimerPage;
