import { useState, useEffect } from 'react';
import axios from 'axios';
import WordHtml from './WordHtml';

const API_URL = 'http://localhost:8080/words';

function Word({ level = 'A1', onGoHome }) {
    const [currentWord, setCurrentWord] = useState(null);
    const [isTranslationVisible, setIsTranslationVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        else {
            return {};
        }
    };

    const fetchRandomWord = async () => {
        try {
            setLoading(true);
            setIsTranslationVisible(false);
            const response = await axios.get(`${API_URL}/random`, {
                params: { level: level },
                headers: getAuthHeader()
            });
            if (!response.data) {
                handleEmptyWords();
            }
            else {
                if (response.status === 204) {
                    handleEmptyWords();
                }
                else {
                    setCurrentWord(response.data);
                }
            }
        }
        catch (err) {
            console.error('Ошибка при загрузке слова:', err);
            alert('Не удалось загрузить слово с сервера');
            onGoHome();
        }
        finally {
            setLoading(false);
        }
    };

    const handleEmptyWords = () => {
        if (window.confirm('Все слова этого уровня изучены, хотите сбросить статистику и начать заново?')) {
            resetStatistics();
        }
        else {
            onGoHome();
        }
    };

    const resetStatistics = async () => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/restart`, {
                params: { level: level },
                headers: getAuthHeader()
            });
            fetchRandomWord();
        }
        catch (err) {
            console.error('Ошибка при сбросе статистики уровня:', err);
            alert('Не удалось сбросить статистику');
            onGoHome();
        }
    };

    const handleAnswer = async (isCorrect) => {
        try {
            await axios.post(`${API_URL}/answer`, {
                wordId: currentWord.id,
                isCorrect: isCorrect
            }, {
                headers: getAuthHeader()
            });
        }
        catch (err) {
            console.error('Не удалось сохранить ответ:', err);
        }
        fetchRandomWord();
    };

    const handleSkip = () => {
        fetchRandomWord();
    };

    useEffect(() => {
        fetchRandomWord();
    }, [level]);

    if (loading) {
        if (!currentWord) {
            return (
                <div className="container text-center pt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                    <p className="mt-2">Поиск случайного слова</p>
                </div>
            );
        }
        else {

        }
    }
    else {

    }

    if (!currentWord) {
        return null;
    }
    else {

    }

    return (
        <WordHtml
            currentWord={currentWord}
            isTranslationVisible={isTranslationVisible}
            onShowTranslation={() => setIsTranslationVisible(true)}
            onAnswer={handleAnswer}
            onSkip={handleSkip}
            onGoHome={onGoHome}
        />
    );
}

export default Word;