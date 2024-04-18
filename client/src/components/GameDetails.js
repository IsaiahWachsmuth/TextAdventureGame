// src/components/GameDetails.js
import React, { useState } from 'react';

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
            const response = await fetch(`https://textadventuregameforeducation.online:3001/games/${gameId}`, {
                method: 'DELETE',
                credentials: 'include',
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
        <section className='d-flex game-detail-wrapper'>
            <header className='game-detail-header'>
                <button onClick={onBack}>Back to List</button>
                <button onClick={() => deleteGame(game.game_id)}>Delete Game</button>
            </header>
            <div className='game-detail-info'>
                <h1>Game Info for <strong>{game.title}</strong></h1>
                <p>Author: {game.author}</p>

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
                                    <div key={index}>{index + 1}. {choice.text} {choice.isCorrect ? "(Correct Answer)" : ""}</div>
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
        </section>
    );
}

export default GameDetails;
