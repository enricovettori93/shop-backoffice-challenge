import React from 'react';
import {Toaster} from "react-hot-toast";
import Header from "../components/header";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Toaster/>
            <Header/>
            <div className="mt-5 w-full px-5">
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;
