import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export const RootLayout = () => {
    return (
        <>
            <header className="p-3 has-background-primary-dark">
                <Navbar />
            </header>
            <main className="container my-5">
                <Outlet />
            </main>
        </>
    )
}
