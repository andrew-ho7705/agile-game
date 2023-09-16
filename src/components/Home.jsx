import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="p-16">
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
