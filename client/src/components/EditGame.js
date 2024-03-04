// client/src/components/EditGame.js
import React, { useState, useEffect } from 'react';

function EditGame({ game, onBack }) {
    const [gameDetails, setGameDetails] = useState({
        title: game.title,
        description: game.description,
        author: game.author,
        pages: game.pages || [],
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(game.image ? `data:image/jpeg;base64,${game.image}` : null);

    useEffect(() => {
    }, [game]);

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

    // const handlePageChange = (index, event) => {
    //};

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', gameDetails.title);
        formData.append('description', gameDetails.description);
        formData.append('author', gameDetails.author);
        // Append pages and image as needed
        if (gameDetails.image instanceof File) {
            formData.append('image', gameDetails.image);
        }

        // const response = await fetch(`http://localhost:3001/games/${game.game_id}`, {
        //     method: 'PUT',
        //     body: formData,
        // });

        onBack();
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
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                </label>

                <button type="submit">Save Changes</button>
                <button type="button" onClick={onBack}>Cancel</button>
            </form>
        </div>
    );
}

export default EditGame;
