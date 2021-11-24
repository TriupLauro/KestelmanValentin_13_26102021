import React, {ReactNode} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

interface LayoutProps {
    children : ReactNode
}

function MainLayout ({children} : LayoutProps) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout