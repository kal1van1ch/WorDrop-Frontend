function WordHtml({
    currentWord,
    isTranslationVisible,
    onShowTranslation,
    onAnswer,
    onSkip,
    onGoHome
}) {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-5 shadow text-center" style={{ width: '100%', maxWidth: '500px' }}>

                <div className="text-center mb-3">
                    <button onClick={onGoHome} className="btn btn-outline-secondary btn-sm">
                        На главную
                    </button>
                </div>

                <h1 className="display-3 my-4 fw-bold text-primary">{currentWord.word}</h1>

                <hr />

                {!isTranslationVisible
                    ? (
                        <div className="mt-4">
                            <button
                                onClick={onShowTranslation}
                                className="btn btn-primary btn-lg w-100 py-3 fw-bold shadow-sm"
                                autoFocus
                            >
                                ПОКАЗАТЬ ПЕРЕВОД
                            </button>
                        </div>
                    )
                    : (
                        <div className="mt-3 animate__animated animate__fadeIn">
                            <p className="text-muted mb-1">Перевод:</p>
                            <h2 className="text fw-bold mb-4">{currentWord.translation}</h2>

                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex gap-2">
                                    <button
                                        onClick={() => onAnswer(true)}
                                        className="btn btn-success btn-lg flex-grow-1 py-3 fw-bold d-flex justify-content-center"
                                    >
                                        Верно
                                    </button>
                                    <button
                                        onClick={() => onAnswer(false)}
                                        className="btn btn-danger btn-lg flex-grow-1 py-3 fw-bold d-flex justify-content-center"
                                    >
                                        Неверно
                                    </button>
                                </div>

                                <button
                                    onClick={onSkip}
                                    className="btn btn-info mt-2 py-2"
                                >
                                    Новое слово (пропустить)
                                </button>
                            </div>
                        </div>
                    )}

            </div>
        </div>
    );
}

export default WordHtml;