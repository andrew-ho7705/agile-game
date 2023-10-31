import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="p-16 text-slate-50">
            <header className="text-center md:py-[80px] lg:py-48 text-6xl md:text-7xl lg:text-8xl">
                Agile Aces Game
            </header>
            <Link to="/estimate" className="flex">
                <span className="m-auto mt-[20px] text-4xl md:text-5xl lg:text-6xl">
                    Click Here To Begin!
                </span>
            </Link>
        </div>
    );
};

export default Home;
