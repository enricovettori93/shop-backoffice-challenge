import {Link} from "react-router-dom";
import ROUTES from "../../routes.ts";

const Header = () => {
    return (
        <header className="p-4 bg-orange-200 w-full rounded-b-xl">
            <Link to={ROUTES.HOME}>
                <h1 className="text-3xl">Pastry shop</h1>
            </Link>
        </header>
    );
};

export default Header;
