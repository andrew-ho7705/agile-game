const ScoreTable = () => {
    const headerStyle = "border border-gray-400 px-4 py-2";
    return (
        <div className="flex flex-row">
            <div>
                {["Scoreboard", "Round 1", "Round 2", "Round 3", "Round 4", "Round 5"].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className={headerStyle}>
                            <b>{_}</b>
                        </td>
                    </tr>
                ))}
            </div>
            <div className="flex flex-row">
                <div></div>
                <table>
                    <thead>
                        <tr className="bg-gray-200">
                            <th className={headerStyle}>Estimated Score</th>
                            <th className={headerStyle}>Balls In Box</th>
                            <th className={headerStyle}>Defects</th>
                            <th className={headerStyle}>Total Score</th>
                            <th className={headerStyle}>∆</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={
                                    rowIndex % 2 === 0 ? "bg-gray-100" : ""
                                }
                            >
                                {[...Array(5)].map((_, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="text-center border border-gray-400 px-4 py-2"
                                    >
                                        Row {rowIndex + 1}, Col {colIndex + 1}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScoreTable;
