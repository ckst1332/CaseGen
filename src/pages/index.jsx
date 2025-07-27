import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Generate from "./Generate";

import Cases from "./Cases";

import Case from "./Case";

import Landing from "./Landing";
import Account from "./Account";
import Payments from "./Payments";
import Login from "./Login";
import Signup from "./Signup";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const PAGES = {

    Landing: Landing,

    Dashboard: Dashboard,

    Generate: Generate,

    Cases: Cases,

    Case: Case,

    Account: Account,

    Payments: Payments,

    Login: Login,

    Signup: Signup,

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
                
                
                <Route path={createPageUrl('Dashboard')} element={<Dashboard />} />

                <Route path={createPageUrl('Generate')} element={<Generate />} />

                <Route path={createPageUrl('Cases')} element={<Cases />} />

                <Route path={createPageUrl('Case')} element={<Case />} />

                <Route path={createPageUrl('Landing')} element={<Landing />} />
                <Route path={createPageUrl('Account')} element={<Account />} />
                <Route path={createPageUrl('Payments')} element={<Payments />} />
                <Route path={createPageUrl('Login')} element={<Login />} />
                <Route path={createPageUrl('Signup')} element={<Signup />} />

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
