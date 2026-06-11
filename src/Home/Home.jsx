import { useState, useEffect } from 'react';
import HomeHtml from './HomeHtml';

function Home({ onStart, onLogout }) {
    const [stats, setStats] = useState({
        learned: 0,
        correct: 0,
        wrong: 0
    });

    useEffect(() => {
        setStats({
            learned: 45,
            correct: 35,
            wrong: 10
        });
    }, 
    []);

    const handleResetStats = () => {
        if (window.confirm('Вы увенеы, что хотите обнулить всю статистику?')) {
            setStats({ learned: 0, correct: 0, wrong: 0 });
        }
    };

    return (
        <HomeHtml
            stats={stats}
            onStart={onStart}
            onReset={handleResetStats}
            onLogout={onLogout}
        />
    );
}

export default Home;