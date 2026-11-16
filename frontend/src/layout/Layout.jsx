import { Outlet, Link } from 'react-router-dom';
import { SiLabex } from "react-icons/si";
import { useTranslation } from 'react-i18next';
import Keys from "../config/Keys";

/*
 * Layout component.
 *
 * Provides a consistent layout with header, navigation, main content area, and footer.
 */
const Layout = () => {
    const { t } = useTranslation();
    return (
        /* 1. Make the root wrapper fill the screen and act as a flex column */
        <div className="min-h-screen flex flex-col">
            <header className="flex items-center p-4 bg-slate-800 shadow">
                <Link to="/">
                    <SiLabex className="text-white mr-2" />
                </Link>
                <span className="text-xl font-bold text-white items-left">{ import.meta.env.VITE_APP_NAME }</span>
            </header>
            
            <nav className="p-4 bg-white border-b">
                <ul className="flex gap-4">
                    <li className="hover:bg-sky-900 text-white"><Link to="/">{ t(Keys.MENU.HOME) }</Link></li>
                    <li className="hover:bg-sky-900 hover:text-white"><Link to="/devices">{ t(Keys.MENU.DEVICES) }</Link></li>
                    <li className="hover:bg-sky-900 hover:text-white"><Link to="/plot">{ t(Keys.MENU.PLOTS) }</Link></li>
                    <li className="hover:bg-sky-900 hover:text-white"><Link to="/zone">{ t(Keys.MENU.ZONES) }</Link></li>
                    <li className="hover:bg-sky-900 hover:text-white"><Link to="/settings">{ t(Keys.MENU.SETTINGS) }</Link></li>
                    <li className="hover:bg-sky-900 hover:text-white"><Link to="/about">{ t(Keys.MENU.ABOUT) }</Link></li>
                </ul>
            </nav>
            
            {/* 2. Add flex-grow so main expands, and pb-20 so content doesn't hide behind the footer */}
            <main className="flex-grow p-4 pb-20 bg-sky-900">
                <Outlet />
            </main>

            {/* 3. Fixed footer stays locked at the bottom */}
            <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white border-slate-800 p-4 shadow-md z-10">
                <p className="text-left">&copy; {import.meta.env.VITE_COPYRIGHT}</p>
            </footer>
        </div>
    );
}

export default Layout;