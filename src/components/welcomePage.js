import React from 'react';
import '../style/home.css';

const WelcomePage = ({ onStart }) => {
    return (
        <div className="welcome-container">
            <h1>Welcome to the Legal Case Chatbot</h1>
            <p>This chatbot helps you analyze legal cases and provides summaries along with applicable legal sections.</p>
            <button className="start-button" onClick={onStart}>Get Started</button>
        </div>
    );
};

export default WelcomePage;
