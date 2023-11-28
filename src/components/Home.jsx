import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="grid justify-items-center text-slate-50">
            <div className="text-center py-56 text-6xl md:text-7xl lg:text-[150px]">
                Agile Aces Game
            </div>
            <Link to="/estimate">
                <div className="text-center text-4xl md:text-5xl lg:text-[100px]">
                    Click Here To Begin!
                </div>
            </Link>
        </div>
    );
};

export default Home;
