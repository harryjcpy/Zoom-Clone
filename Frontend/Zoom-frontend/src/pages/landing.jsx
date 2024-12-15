import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return <div className="landingPageContainer">
        <nav>
            <div className="navHaeder">
                <h2><span style={{ color: "blue" }}>Zoom</span> Clone</h2>
            </div>
            <div className="navList">
                <p>Join as Guest</p>
                <p>Register</p>
                <div role="button"><p>Login</p></div>
            </div>
        </nav>

        <div className="landingMainContainer">
            <div><h1><span style={{ color: "blue" }}>Connect</span> with your people!</h1>
                <div role="button">
                    <Link to={"/home"}>Get Started</Link>
                </div>
            </div>
        </div>;
    </div>
}

export default LandingPage;