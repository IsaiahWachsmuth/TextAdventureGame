import React, { useState } from 'react';

function EditGame({ game, onBack }) {
    const [gameDetails, setGameDetails] = useState({
        title: game.title || '',
        description: game.description || '',
        author: game.author || '',
        pages: game.pages || [],
        image: game.image || null,
    });

    // This will handle the preview for both existing images and new uploads
    const [imagePreview, setImagePreview] = useState(game.image ? `data:image/jpeg;base64,${game.image}` : null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGameDetails({ ...gameDetails, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setGameDetails({ ...gameDetails, image: file });
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', gameDetails.title);
        formData.append('description', gameDetails.description);
        formData.append('author', gameDetails.author);
        // Handling image upload if a new image was selected
        if (gameDetails.image instanceof File) {
            formData.append('image', gameDetails.image);
        } else {
            // If no new image was selected, but there's an existing one, send its info
            if(gameDetails.image) formData.append('existingImage', gameDetails.image);
        }
        // Stringify each page object to handle complex structures
        gameDetails.pages.forEach((page, index) => {
            formData.append(`pages[${index}]`, JSON.stringify(page));
        });

        try {
            const response = await fetch(`http://localhost:3001/games/${game.game_id}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            });
            if (response.ok) {
                // Handle success scenario, maybe refresh the list or go back
                onBack();
            } else {
                throw new Error('Failed to update the game');
            }
        } catch (error) {
            console.error('Error updating the game:', error);
        }
    };

    return (
        <div>
            <h2>Edit Game</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={gameDetails.title} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={gameDetails.description} onChange={handleChange}></textarea>
                </label>
                <label>
                    Author:
                    <input type="text" name="author" value={gameDetails.author} onChange={handleChange} />
                </label>
                <label>
                    Image:
                    <input type="file" name="image" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                </label>
                {gameDetails.pages.map((page, index) => (
                    <div key={index}>
                        <h4>Page {index + 1}</h4>
                        <label>
                            Content:
                            <input type="text" name="content" value={page.content || ''} onChange={(e) => handlePageChange(index, 'content', e.target.value)} />
                        </label>
                        {/* Include fields for question, choices, etc., as needed */}
                        <button type="button" onClick={() => removePage(index)}>Remove Page</button>
                    </div>
                ))}
                <button type="button" onClick={addNewPage}>Add New Page</button>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onBack}>Cancel</button>
            </form>
        </div>
    );
}

export default EditGame;
