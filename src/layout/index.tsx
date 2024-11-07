import React from 'react';
import {Toaster} from "react-hot-toast";
import Header from "../components/header";
import {Outlet} from "react-router-dom";
import Footer from "../components/footer";

const Layout = () => {
    return (
        <div>
            <Toaster/>
            <Header/>
            <section className="mb-20 mt-10 w-full px-5">
                <Outlet/>
            </section>
            <Footer />
        </div>
    );
};

export default Layout;
