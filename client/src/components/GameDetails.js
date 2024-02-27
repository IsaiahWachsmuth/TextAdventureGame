// client/src/components/GameDetails.js
import React, { useState } from 'react';

function GameDetails({ game, onBack }) {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const hasPages = game.pages && game.pages.length > 0; // Check if pages exist and are not empty

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

    return (
        <div>
            <h2>Game Details</h2>
            <p><strong>Title:</strong> {game.title}</p>
            <p><strong>Description:</strong> {game.description}</p>
            <p><strong>Author:</strong> {game.author}</p>
            <p>
                {game.image && (
                    <img src={`data:image/jpeg;base64,${game.image}`} alt="Game Image" style={{ maxWidth: '100%', height: '480px' }} />
                )}
            </p>
            {hasPages ? (
                <>
                    <div>
                        <h3>Page {currentPageIndex + 1}</h3>
                        <p><strong>Page ID:</strong> {game.pages[currentPageIndex].page_id}</p>
                        <p><strong>Content:</strong> {game.pages[currentPageIndex].content}</p>
                        <p><strong>Question:</strong> {game.pages[currentPageIndex].question}</p>
                        <p><strong>Choices:</strong> {game.pages[currentPageIndex].choices.join(', ')}</p>
                        {/* Render image if available */}
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
                <p>No pages available for this game.</p>
            )}
            <button onClick={onBack}>Back to List</button>
        </div>
    );
}

export default GameDetails;
