import React, { useState } from 'react';
import WelcomePage from './components/welcomePage';
import Chatbot from './components/chatBot';

const App = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    const handleStart = () => {
        setShowChatbot(true);
    };

    return (
        <div>
            {showChatbot ? <Chatbot /> : <WelcomePage onStart={handleStart} />}
        </div>
    );
};

export default App;
