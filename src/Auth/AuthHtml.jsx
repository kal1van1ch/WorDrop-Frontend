function AuthHtml({
    isLogin,
    username,
    password,
    error,
    setUsername,
    setPassword,
    setIsLogin,
    onSubmit
}) {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">{isLogin ? 'Вход' : 'Регистрация'}</h2>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Логин:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Пароль:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="btn btn-link text-decoration-none"
                    >
                        {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthHtml;