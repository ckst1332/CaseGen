import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Generate from "./Generate";

import Cases from "./Cases";

import Case from "./Case";

import Landing from "./Landing";
import Account from "./Account";
import Login from "./Login";
import Signup from "./Signup";
import Subscription from "./Subscription";
import RequireAuth from "./RequireAuth";

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

const PAGES = {

    Landing: Landing,

    Dashboard: Dashboard,

    Generate: Generate,

    Cases: Cases,

    Case: Case,

    Account: Account,
    Login: Login,
    Signup: Signup,
    Subscription: Subscription,

}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/subscription" element={<RequireAuth><Subscription /></RequireAuth>} />

                <Route path="/Dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/Generate" element={<RequireAuth><Generate /></RequireAuth>} />
                <Route path="/Cases" element={<RequireAuth><Cases /></RequireAuth>} />
                <Route path="/Case" element={<RequireAuth><Case /></RequireAuth>} />
                <Route path="/Landing" element={<Landing />} />
                <Route path="/Account" element={<RequireAuth><Account /></RequireAuth>} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}