import React, { useState } from 'react';

function AddGame({ onBack }) {
    const [game, setGame] = useState({ title: '', description: '', author: '', pages: {} });
    const [image, setImage] = useState(null); // State for the image

    const handleChange = (event) => {
        if (event.target.name === 'image') {
            setImage(event.target.files[0]); // Handle image file
        } else {
            setGame({ ...game, [event.target.name]: event.target.value }); // Handle other inputs
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(); // Use FormData to handle file upload
        formData.append('title', game.title);
        formData.append('description', game.description);
        formData.append('author', game.author);
        // Append other game fields as needed
        if (image) formData.append('image', image); // Append the image file if present

        try {
            const response = await fetch('http://localhost:3001/games', {
                method: 'POST',
                // Do not set Content-Type header when using FormData
                // headers: { 'Content-Type': 'multipart/form-data' }, // This is not needed, browser will set it
                body: formData, // Send formData instead of JSON
            });
            if (response.ok) {
                // Call onBack to switch back to the game listing view instead of navigating
                onBack();
            } else {
                throw new Error('Failed to create game');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='d-flex add-game-form'>
            <h2>Add a New Game</h2>
            <p>Fill in the details of the game you want to add, including an image.</p>
            <form className='d-flex' onSubmit={handleSubmit}>
                <label>
                    <input type="text" placeholder='Title' name="title" value={game.title} onChange={handleChange} />
                </label>
                <label>
                    <input type="text" placeholder='Author' name="author" value={game.author} onChange={handleChange} />
                </label>
                <label>
                    <textarea placeholder='Description' name="description" value={game.description} onChange={handleChange}></textarea>
                </label>
                <label>
                    Upload Image:
                    <input type="file" name="image" onChange={handleChange} />
                </label>
                {/* Add fields for other properties like pages if necessary */}
                <button type="submit">Add Game</button>
                <button type="button" onClick={onBack}>Cancel</button>
            </form>
        </div>
    );
}

export default AddGame;
