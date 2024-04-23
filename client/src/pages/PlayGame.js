import React, { useState, useEffect, useRef } from 'react';

const PlayGamePage = () => {
    const [gameInfo, setGameInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [history, setHistory] = useState([]);
    const [displayText, setDisplayText] = useState('');
    const [username, setUsername] = useState('');
    const [isUsernameEntered, setIsUsernameEntered] = useState(false);
    const [isTextDisplaying, setIsTextDisplaying] = useState(false);
    const historyRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const fullPathname = window.location.pathname;
            const pathParts = fullPathname.split('/');
            const classcode = pathParts[pathParts.length - 1];

            try {
                const url = 'http://localhost:3001/games/checkClassCode';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: classcode,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setGameInfo(data.game);
                    setCurrentPage(data.game.pages[0]);

                } else {
                    setGameInfo("No such game exists!");
                    alert("NO SUCH GAME EXISTS");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setGameInfo("Error fetching data");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    const displayProgressively = (text) => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= text.length) {
                setDisplayText(text.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 20);
    };

    useEffect(() => {
        if (isTextDisplaying && currentPage) {
            displayProgressively(`${currentPage.content}\n${currentPage.question}`);
        }
    }, [isTextDisplaying, currentPage]);

    const handleOptionClick = (choice) => {
        let nextPage = null;

        for (let i = 0; i < gameInfo.pages.length; i++) {
            if (gameInfo.pages[i].page_id === choice.pageNav) {
                nextPage = gameInfo.pages[i];
                break;
            }
        }

        if (nextPage) {
            setHistory([...history, { content: currentPage.content, question: currentPage.question, choiceText: choice.text, image: currentPage.image }]);
            setCurrentPage(nextPage);
        } else {
            console.log("DOESN'T EXIST");
        }
    };

    const handleUsernameSubmit = () => {
        if (username.trim() !== '') {
            setIsUsernameEntered(true);
            setIsTextDisplaying(true); // Start displaying text progressively
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleUsernameSubmit();
        }
    };

    return (
        <div className="playgame-container">
            {!isUsernameEntered && (
                <div className="playgame-username-popup">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleUsernameSubmit}>Submit</button>
                </div>
            )}

            {isUsernameEntered && (
                <>
                    <h3 className="playgame-title">{gameInfo && gameInfo.title}</h3>

                    <div className="playgame-history-container" ref={historyRef}>
                        {history.map((entry, index) => (
                            <div key={index} className="playgame-history-page">
                                <h3>{entry.content}</h3>
                                <h3>{entry.question}</h3>
                                {entry.image && <img src={entry.image} alt="History" />}
                                {entry.choiceText && <p>Chosen Option: {entry.choiceText}</p>}
                            </div>
                        ))}
                    </div>

                    <button className="playgame-back-button" onClick={() => window.history.back()}>Back</button>

                    {currentPage && (
                        <div className="playgame-current-page">
                            <h4>Current Page</h4>
                            <h3>{displayText}</h3>
                            {currentPage.image && <img src={currentPage.image} alt="Current" />}
                            {currentPage.choices && currentPage.choices.length > 0 ? (
                                <div>
                                    {currentPage.choices.map((choice, index) => (
                                        <button key={index} onClick={() => handleOptionClick(choice)}>
                                            {choice.text}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p>No options available.</p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PlayGamePage;
