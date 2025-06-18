import { House } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-black text-white border-b-2 mb-10">
            <Link to="/" className="flex p-3 gap-2 items-center">
                <House />
                <h1 className="text-2xl">Início</h1>
            </Link>
        </div>
    );
};

export default Header;
