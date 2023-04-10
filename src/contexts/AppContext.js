import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";


export const AppContext = createContext([]);


const AppContextContainer = ({ children }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cookie = new Cookies();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isLoggedIn = cookie.get("isLoggedin");

        if (!isLoggedIn && !["/login", "/signUp"].includes(location.pathname)) {
            navigate("/login");
            toast.info("Login to continue")
        } else if (isLoggedIn && ["/login", "/signUp"].includes(location.pathname)) {
            navigate("/admin/");
            toast.info("Already Logged in ");
        }
    }, [cookie, location, navigate]);

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextContainer
