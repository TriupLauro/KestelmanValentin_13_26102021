import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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

