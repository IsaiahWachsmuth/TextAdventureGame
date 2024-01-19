import React from 'react';
import MainArea from './MainArea';
import Sidebar from './Sidebar';

const LandingPage = () => {
    return (
        <div class="d-flex">
            <MainArea />
            <Sidebar />
        </div>
    );
}

export default LandingPage;
