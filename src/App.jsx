import { useState, useEffect } from 'react';
import Auth from './Auth/Auth';
import Home from './Home/Home';

function App() {
    const [currentScreen, setCurrentScreen] = useState('auth');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setCurrentScreen('home');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentScreen('auth');
    };

    return (
        <div className="app-container bg-light" style={{ minHeight: '100vh' }}>
            {currentScreen === 'auth' && (
                <Auth onLoginSuccess={() => setCurrentScreen('home')} />
            )}

            {currentScreen === 'home' && (
                <Home
                    onStart={() => setCurrentScreen('word')}
                    onLogout={handleLogout}
                />
            )}

            {currentScreen === 'word' && (<h1>Экран для слова</h1>)}
        </div>
    );
}

export default App;