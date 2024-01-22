import React from 'react';
import MainArea from './MainArea';
import Sidebar from './Sidebar';

const LandingPage = () => {
    return (
        <div class="d-flex">
            {/* MainArea and Sidebar componets load in a flexbox */}
            <MainArea />
            <Sidebar />
        </div>
    );
}

export default LandingPage;
