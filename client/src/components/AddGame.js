// client/src/components/AddGame.js
import React, { useState, useEffect } from 'react';

function AddGame({ onBack }) {
    const [game, setGame] = useState({ title: '', description: '', author: '', pages: [] }); // Initialize pages as an array
    const [image, setImage] = useState(null); // State for the image
    const [imagePreview, setImagePreview] = useState(null); // State for the image preview

    // useEffect hook can handle image preview
    useEffect(() => {
        if (image) {
            const previewUrl = URL.createObjectURL(image);
            setImagePreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [image]);

    const handleChange = (event) => {
        if (event.target.name === 'image') {
            setImage(event.target.files[0]); // Handle image file
        } else {
            setGame({ ...game, [event.target.name]: event.target.value }); // Handle other inputs
        }
    };

    const handlePageChange = (index, event) => {
        const { name, value, type } = event.target;
        const pages = [...game.pages];

        if (type === 'file') {
            const reader = new FileReader();
            const file = event.target.files[0];

            reader.onloadend = () => {
                const imageData = reader.result;
                pages[index][name] = imageData; // Store image data as Base64
                pages[index]['imagePreview'] = URL.createObjectURL(file); // Create a preview URL
                setGame({ ...game, pages });
            };

            if (file) {
                reader.readAsDataURL(file); // Read the file as Data URL
            }
        } else {
            pages[index][name] = value;
            setGame({ ...game, pages });
        }
    };



    const addPage = () => {
        setGame({ ...game, pages: [...game.pages, { page_id: '', content: '', question: '', choices: '', image: '' }] });
    };

    const removePage = (index) => {
        const pages = [...game.pages];
        pages.splice(index, 1);
        setGame({ ...game, pages });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(); // Use FormData to handle file upload
        formData.append('title', game.title);
        formData.append('description', game.description);
        formData.append('author', game.author);
        game.pages.forEach((page, index) => {
            Object.entries(page).forEach(([key, value]) => {
                formData.append(`pages[${index}][${key}]`, value);
            });
        });
        // Append other game fields as needed
        if (image) formData.append('image', image); // Append the image file if present
    
        try {
            const response = await fetch('http://localhost:3001/games', {
                method: 'POST',
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
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                </label>
                {/* Add fields for other properties like pages if necessary */}
                <div>
                    <h3>Pages</h3>
                    {game.pages.map((page, index) => (
                        <div key={index}>
                            <label>
                                Page ID:
                                <input type="text" name="page_id" value={page.page_id} onChange={(e) => handlePageChange(index, e)} />
                            </label>
                            <label>
                                Content:
                                <textarea name="content" value={page.content} onChange={(e) => handlePageChange(index, e)}></textarea>
                            </label>
                            <label>
                                Question:
                                <input type="text" name="question" value={page.question} onChange={(e) => handlePageChange(index, e)} />
                            </label>
                            <label>
                                Choices:
                                <input type="text" name="choices" value={page.choices} onChange={(e) => handlePageChange(index, e)} />
                            </label>
                            <label>
                                Upload Image:
                                <input type="file" name="image" onChange={(e) => handlePageChange(index, e)} />
                                    {page.imagePreview && (
                                        <img src={page.imagePreview} alt="Page Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                                    )}
                            </label>
                            <button type="button" onClick={() => removePage(index)}>Remove Page</button>
                        </div>
                    ))}
                    <button type="button" onClick={addPage}>Add Page</button>
                </div>
                <button type="submit">Add Game</button>
                <button type="button" onClick={onBack}>Cancel</button>
            </form>
        </div>
    );
}

export default AddGame;
