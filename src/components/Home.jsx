import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="p-16">
            <header className="text-center text-6xl py-52">
                Agile Aces Game
            </header>
            <Link to="/game" className="flex">
                <span className="m-auto text-5xl">Click Here To Begin!</span>
            </Link>
        </div>
    );
};

export default Home;
