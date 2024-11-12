import {Toaster} from "react-hot-toast";
import Header from "../components/header";
import {Outlet} from "react-router-dom";
import Footer from "../components/footer";

const Layout = () => {
    return (
        <div className="relative">
            <Toaster/>
            <Header/>
            <main className="py-10 w-full px-5 mb-40 bg-white relative z-40">
                <Outlet/>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
