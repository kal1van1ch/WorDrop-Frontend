import { useState } from 'react';
import axios from 'axios';
import AuthHtml from './AuthHtml';

function Auth({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const url = isLogin
            ? 'http://localhost:8080/auth/login'
            : 'http://localhost:8080/auth/register';

        try {
            const response = await axios.post(
                url,
                {
                    username,
                    password
                }
            );

            if (isLogin) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                onLoginSuccess();
            } else {
                alert('Регистрация успешна! Теперь войдите в аккаунт.');
                setIsLogin(true);
                setPassword('');
            }
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Не удалось связаться с сервером');
            }
        }
    };

    return (
        <AuthHtml
            isLogin={isLogin}
            username={username}
            password={password}
            error={error}
            setUsername={setUsername}
            setPassword={setPassword}
            setIsLogin={setIsLogin}
            onSubmit={handleSubmit}
        />
    );
}

export default Auth;