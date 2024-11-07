import Header from "./components/header";
import {Toaster} from "react-hot-toast";
import {Outlet} from "react-router-dom";

const App = () => {
    return (
        <div>
            <Toaster/>
            <Header />
            <section className="mt-5 w-full px-5">
                <Outlet />
            </section>
        </div>
    );
};

export default App;
