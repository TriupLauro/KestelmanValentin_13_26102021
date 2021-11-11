import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import React from "react";

function MainLayout({children}) {
    return (
        <>
            <NavBar />
                {children}
            <Footer />
        </>
    )
}

export default MainLayout

