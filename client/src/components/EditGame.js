// client/src/components/EditGame.js
import React, { useState } from 'react';

function EditGame({ game, onBack }) {
    const [gameDetails, setGameDetails] = useState({
        title: game.title || '',
        description: game.description || '',
        author: game.author || '',
        classCode: game.class_code || '',
        pages: game.pages || [],
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(game.image ? `data:image/jpeg;base64,${game.image}` : null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGameDetails({ ...gameDetails, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setImage(file);
        }
    };

    const handlePageChange = (index, name, value) => {
        const updatedPages = gameDetails.pages.map((page, pageIndex) => {
            if (index === pageIndex) {
                return { ...page, [name]: value };
            }
            return page;
        });
        setGameDetails({ ...gameDetails, pages: updatedPages });
    };

    const addNewPage = () => {
        setGameDetails({
            ...gameDetails,
            pages: [...gameDetails.pages, { content: '', question: '', choices: [''] }],
        });
    };

    const removePage = (index) => {
        const filteredPages = gameDetails.pages.filter((_, pageIndex) => index !== pageIndex);
        setGameDetails({ ...gameDetails, pages: filteredPages });
    };

    const addChoiceToPage = (pageIndex) => {
        const newGameDetails = { ...gameDetails };
        const newPage = { ...newGameDetails.pages[pageIndex] };
        if (!newPage.choices) {
            newPage.choices = []; // Ensure there's a choices array to push to
        }
        newPage.choices.push({ text: '', isCorrect: false }); // Add a new choice object
        newGameDetails.pages[pageIndex] = newPage;
        setGameDetails(newGameDetails);
    };
    
    const removeChoiceFromPage = (pageIndex, choiceIndex) => {
        const newGameDetails = { ...gameDetails };
        const newPage = { ...newGameDetails.pages[pageIndex] };
        if (newPage.choices && newPage.choices.length > 1) { // Ensure there are choices to remove
            newPage.choices.splice(choiceIndex, 1); // Remove the choice at choiceIndex
            newGameDetails.pages[pageIndex] = newPage;
            setGameDetails(newGameDetails);
        } else {
            console.warn("Cannot remove the last choice.");
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        
        // Append simple fields directly
        formData.append('title', gameDetails.title);
        formData.append('description', gameDetails.description);
        formData.append('author', gameDetails.author);
        
        // Append each page as a JSON string
        gameDetails.pages.forEach((page, index) => {
            formData.append(`pages[${index}]`, JSON.stringify(page)); // Modified to append each page as a string
        });
    
        // Handling image upload if a new image was selected
        if (image instanceof File) {
            formData.append('image', image);
        } else {
            if(gameDetails.image) formData.append('keepExistingImage', 'true');
        }
    
        try {
            const response = await fetch(`http://localhost:3001/games/${game.game_id}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            });
            if (response.ok) {
                onBack();
            } else {
                throw new Error('Failed to update the game');
            }
        } catch (error) {
            console.error('Error updating the game:', error);
        }
    };
    

    return (
        <section className='d-flex edit-game-wrap'>
    
            <section className='d-flex edit-game-details' id='edit-game-sec'>
                <h2>Edit Game Info</h2>
                <form className='d-flex' onSubmit={handleSubmit}>
                    <label>
                        <input type="text" placeholder='Title' name="title" value={gameDetails.title} onChange={handleChange} />
                    </label>
                    <label>
                        <input type="text" placeholder='Author' name="author" value={gameDetails.author} onChange={handleChange} />
                    </label>
                    <span>
                        Class Code: {gameDetails.classCode}
                    </span>
                    <label>
                        <textarea name="description" placeholder='Description' value={gameDetails.description} onChange={handleChange}></textarea>
                    </label>
                    <label>
                        Image:
                        <input type="file" name="image" onChange={handleImageChange} />
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                    </label>
                    <button type="button" onClick={addNewPage}>Add Page</button>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={onBack}>Cancel</button>
                </form>
            </section>
    
            <section className='d-flex edit-game-pages' id='edit-page-sec'>
                <h2>Edit Pages</h2>
                {gameDetails.pages.map((page, index) => (
                    <div key={index} className='edit-page-form'>
                        <h4>Page {index + 1}</h4>
                        <label>
                            <textarea name="content" placeholder='Contnet' value={page.content || ''} onChange={(e) => handlePageChange(index, 'content', e.target.value)}></textarea>
                        </label>
                        <label>
                            <input type="text" name="question" placeholder='Question' value={page.question || ''} onChange={(e) => handlePageChange(index, 'question', e.target.value)} />
                        </label>

                        {page.choices.map((choice, choiceIndex) => (
                            <div key={choiceIndex} className='edit-choice-form'>
                                <label>
                                    Choice {choiceIndex + 1}:
                                    <input
                                        type="text"
                                        placeholder='Choice Text'
                                        name={`choice-${choiceIndex}`}
                                        value={choice.text || ''}
                                        onChange={(e) => handlePageChange(index, `choices-${choiceIndex}`, e.target.value)}
                                    />
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={`choice-correct-${choiceIndex}`}
                                        checked={choice.isCorrect || false}
                                        onChange={(e) => handlePageChange(index, `choices-correct-${choiceIndex}`, e.target.checked)}
                                    /> Correct
                                </label>
                                {page.choices.length > 1 && (
                                    <button type="button" onClick={() => removeChoiceFromPage(index, choiceIndex)}>Remove Choice</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => addChoiceToPage(index)}>Add Choice</button>
                        <button type="button" onClick={() => removePage(index)}>Remove Page</button>
                    </div>
                ))}
                
            </section>
    
        </section>
    );
}

export default EditGame;
