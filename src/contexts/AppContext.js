import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";


export const AppContext = createContext([]);


const AppContextContainer = ({ children }) => {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isLoggedIn = cookie.get("isLoggedin");
        if (!isLoggedIn) {
            navigate("/login");
        } else if (isLoggedIn && location.pathname === "/login") {
            navigate("/admin/");
            toast.success("Already Logged in ")
        }
    }, [location]);

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextContainer
