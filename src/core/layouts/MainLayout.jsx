import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <AdBanner slot="header-banner" className="max-w-7xl mx-auto w-full mt-2 mx-4" />
            <main className="flex-1">
                <Outlet />
            </main>
            <AdBanner slot="footer-banner" className="max-w-7xl mx-auto w-full mb-4" />
            <Footer />
        </div>
    );
}
