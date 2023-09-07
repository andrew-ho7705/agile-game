import { useState } from "react";

const iterationScores = {
    estimatedScore: 0,
    ballsInBox: 0,
    defects: 0,
    totalScore: 0,
    delta: 0,
};

export const scoreTable = [
    { ...iterationScores },
    { ...iterationScores },
    { ...iterationScores },
    { ...iterationScores },
    { ...iterationScores },
];

const ScoreTable = () => {
    const [gameIteration, setGameIteration] = useState(1);

    return (
        <>  
            <div className="ml-36">
                {["Estimated Score", "Balls In Box", "Defects", "Total Score", "∆"].map((header) => 
                    <span className="border px-4">{header}</span>
                )}
            </div>
            <div>
                {scoreTable.map((score, iteration) => (
                    <div key={iteration} hidden={iteration > gameIteration - 1}>
                        <div iteration={iteration} className="flex flex-row">
                            <span className="px-9 ">
                                {"Iteration " + parseInt(iteration + 1)}
                            </span>
                            {iteration === 0 ? (
                                <div id="estimated" className="px-16 mr-7">
                                    {score.estimatedScore}
                                </div>
                            ) : (
                                <input
                                    id="estimated"
                                    className="border w-16 px-20"
                                ></input>
                            )}
                            <div id="ballsInBox" className="px-9">
                                {score.ballsInBox}
                            </div>
                            <input
                                id="defects"
                                type="text"
                                className="border w-16 ml-6 px-10"
                            ></input>
                            <div id="totalScore" className="px-14">
                                {score.ballsInBox - score.defects}
                            </div>
                            <div id="delta" className="px-5 ">
                                {score.ballsInBox === 0
                                    ? 0
                                    : score.estimatedScore - score.ballsInBox}
                            </div>
                        </div>
                    </div>
                ))}
                <button className="p-24 " onClick={() => setGameIteration(gameIteration + 1)}>Mock Increment Iteration</button>
            </div>
        </>
    );
};

export default ScoreTable;
