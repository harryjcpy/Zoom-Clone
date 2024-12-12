import React from 'react';
import "../App.css";

const LandingPage = () => {
    return <div className="landingPageContainer">
        <nav>
            <div className="navHaeder">
                <h2>Zoom Clone</h2>
            </div>
            <div className="navList">
                <p>Join as Guest</p>
                <p>Register</p>
                <div role="button"><p>Login</p></div>
            </div>
        </nav>
    </div>;
}

export default LandingPage;