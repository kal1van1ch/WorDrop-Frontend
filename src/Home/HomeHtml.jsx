function HomeHtml({ stats, onStart, onReset, onLogout }) {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-5 shadow text-center" style={{ width: '100%', maxWidth: '500px' }}>

                <h1 className="mb-4">Панель WorDrop</h1>

                <button onClick={onStart} className="btn btn-success btn-lg w-100 mb-4 py-3 fw-bold shadow-sm">
                    НАЧАТЬ ТРЕНИРОВКУ
                </button>

                <hr />

                <div className="bg-light p-3 rounded mb-4 text-start">
                    <h5 className="text-center mb-3">Статистика</h5>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Изучено слов:</span>
                        <span className="fw-bold text-primary">{stats.learned}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Верных ответов:</span>
                        <span className="fw-bold text-success">{stats.correct}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Неверных ответов:</span>
                        <span className="fw-bold text-danger">{stats.wrong}</span>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                    <button onClick={onReset} className="btn btn-outline-danger btn-sm">
                        Сбросить прогресс
                    </button>

                    <button onClick={onLogout} className="btn btn-secondary btn-sm">
                        Выйти из аккаунта
                    </button>
                </div>

            </div>
        </div>
    );
}

export default HomeHtml;