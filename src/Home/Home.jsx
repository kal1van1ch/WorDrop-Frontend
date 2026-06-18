import { useState, useEffect } from 'react';
import HomeHtml from './HomeHtml';
import axios from 'axios';

const API_URL = 'http://localhost:8080/words';

function Home({ level, onLevelChange, onStart, onLogout }) {
    const [stats, setStats] = useState({ learned: 0, correct: 0, wrong: 0 });

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        else {
            return {};
        }
    };

    const updateStats = (data) => {
        setStats({
            learned: data.totalLearned,
            correct: data.correct,
            wrong: data.wrong
        });
    };

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_URL}/stat`, { headers: getAuthHeader() });
            updateStats(response.data);
        }
        catch (err) {
            console.error('Не удалось загрузить статистику:', err);
        }
    };

    const handleResetStats = async () => {
        if (window.confirm('Вы уверены, что хотите полностью сбросить весь прогресс?')) {
            try {
                const response = await axios.delete(`${API_URL}/restart`, { headers: getAuthHeader() });
                updateStats(response.data);
                alert('Весь прогресс успешно сброшен');
            }
            catch (err) {
                console.error('Ошибка при сбросе статистики:', err);
                alert('Не удалось сбросить статистику');
            }
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <HomeHtml
            stats={stats}
            level={level}
            setLevel={onLevelChange}
            onStart={onStart}
            onReset={handleResetStats}
            onLogout={onLogout}
        />
    );
}

export default Home;