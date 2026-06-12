import { useState, useEffect } from 'react';
import Auth from './Auth/Auth';
import Home from './Home/Home';
import Word from './Word/Word';

function App() {
    const [currentScreen, setCurrentScreen] = useState('auth');
    const [selectedLevel, setSelectedLevel] = useState('A1');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setCurrentScreen('home');
        }
        else {

        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentScreen('auth');
    };

    const handleStart = (level) => {
        if (typeof level === 'string') {
            setSelectedLevel(level);
        }
        else {
            setSelectedLevel('A1');
        }
        setCurrentScreen('word');
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'auth':
                return <Auth onLoginSuccess={() => setCurrentScreen('home')} />;
            case 'home':
                return (
                    <Home
                        level={selectedLevel}
                        onLevelChange={setSelectedLevel}
                        onStart={handleStart}
                        onLogout={handleLogout}
                    />
                );
            case 'word':
                return (
                    <Word
                        level={selectedLevel}
                        onGoHome={() => setCurrentScreen('home')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="app-container bg-light" style={{ minHeight: '100vh' }}>
            {renderScreen()}
        </div>
    );
}

export default App;