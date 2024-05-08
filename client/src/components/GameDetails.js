import React, { useState, useEffect } from 'react';

function RecentPlaythroughs({ game }) {
    const [playthroughs, setPlaythroughs] = useState([]);

    useEffect(() => {
        const fetchPlaythroughs = async () => {
            try {
                const response = await fetch(`http://localhost:3001/transcripts?gameId=${game.game_id}`);
                const data = await response.json();
                setPlaythroughs(data);
            } catch (error) {
                console.error("Failed to fetch playthroughs:", error);
            }
        };

        fetchPlaythroughs();
    }, [game]);

    return (
        <div className="recent-playthroughs">
            <h2>Recent Playthroughs</h2>
            {Array.isArray(playthroughs) && playthroughs.map((playthrough, index) => (
                <div key={index}>
                    <p>{playthrough.studentName}: {playthrough.playhistory.length} pages played</p>
                </div>
            ))}
        </div>
    );
}

function GameDetails({ game, onBack }) {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const hasPages = game.pages && game.pages.length > 0;

    const goToNextPage = () => {
        if (hasPages) {
            setCurrentPageIndex((prevIndex) => Math.min(prevIndex + 1, game.pages.length - 1));
        }
    };

    const goToPreviousPage = () => {
        if (hasPages) {
            setCurrentPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const deleteGame = async (gameId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this game?");
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/games/${gameId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Game deleted successfully.");
                onBack(); // Navigate back or refresh the list
            } else {
                alert("Failed to delete the game.");
            }
        } catch (error) {
            console.error("There was an error deleting the game:", error);
            alert("An error occurred while deleting the game.");
        }
    };

    return (
        <div>
            <header className='game-detail-header'>
                <button onClick={onBack}>Back to List</button>
                <button onClick={() => deleteGame(game.game_id)}>Delete Game</button>
            </header>
            <section className='d-flex game-detail-wrapper'>
                <div className='game-detail-info'>
                    <h1>Game Info for <strong>{game.title}</strong></h1>
                    <p>Author: {game.author}</p>
                    <p>Class Code: {game.class_code}</p>
                    <div className='game-detail-image-wrapper'>
                        {game.image && (
                            <img src={`data:image/jpeg;base64,${game.image}`} alt="Game Image" style={{ maxWidth: '100%', height: '480px' }} />
                        )}
                    </div>
                    <div className='game-detail-description'>
                        <p>{game.description}</p>
                    </div>
                </div>

                <div className='game-detail-pages'>
                    <h1>Game Pages for <strong>{game.title}</strong></h1>
                    {hasPages ? (
                        <>
                            <div>
                                <h3>Page {currentPageIndex + 1}</h3>
                                <p><strong>Page ID:</strong> {game.pages[currentPageIndex].page_id}</p>
                                <p><strong>Content:</strong> {game.pages[currentPageIndex].content}</p>
                                <p><strong>Question:</strong> {game.pages[currentPageIndex].question}</p>
                                <p><strong>Choices:</strong>
                                    <div>
                                        {game.pages[currentPageIndex].choices.map((choice, index) => (
                                            <div key={index}>{index + 1}. {choice.text} {choice.isCorrect ? "(Correct Answer)" : ""} 
                                                <p>{choice.pageNav ? `This choice navigates to room: ${choice.pageNav}` : ""}</p>
                                            </div>
                                        ))}
                                    </div>
                                </p>
                                {game.pages[currentPageIndex].image && (
                                    <p>
                                        <img src={`${game.pages[currentPageIndex].image}`} alt="Page Image" style={{ maxWidth: '100%', height: '240px' }} />
                                    </p>
                                )}
                            </div>
                            <div>
                                <button onClick={goToPreviousPage} disabled={currentPageIndex === 0}>Previous Page</button>
                                <button onClick={goToNextPage} disabled={currentPageIndex === game.pages.length - 1}>Next Page</button>
                            </div>
                        </>
                    ) : (
                        <h3>No pages available for this game.</h3>
                    )}
                </div>

                {/* New section for recent playthroughs */}
                <RecentPlaythroughs game={game} />
            </section>
        </div>
    );
}

export default GameDetails;
