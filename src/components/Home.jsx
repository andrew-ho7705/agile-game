import { Link } from "react-router-dom";
// import { API } from "aws-amplify";
// const myAPI = "agileAcesAPI";
// const path = "/gameScores";

const Home = () => {
    // const init = {
    //     body: {
    //         "TableName": "GameScores",
    //         "Item": {
    //             "teamName": {
    //                 "S": "testTeamName",
    //             }
    //         }
    //     }
    // }
    // const handleGetGameScores = () => {
    //     API.post(myAPI, `dev/${path}`, init)
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error => {
    //             console.error("Error getting from DB: ", error);
    //         });
    // };
    // handleGetGameScores();
    return (
        <div className="p-16 text-slate-50">
            <header className="text-center text-8xl py-48">
                Agile Aces Game
            </header>
            <Link to="/estimate" className="flex">
                <span className="m-auto text-6xl">Click Here To Begin!</span>
            </Link>
        </div>
    );
};

export default Home;
