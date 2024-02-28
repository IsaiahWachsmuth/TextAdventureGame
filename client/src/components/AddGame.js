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
        <section className='d-flex add-game-wrap'>
            {/* Split this into wo sections */}
            <section className='d-flex add-game-form' id='add-game-sec'>
                <h2>Game Info</h2>
                <p>Fill in the details of the game you want to create, including an image.</p>
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
                        <input type="file" placeholder="Add Image" name="image" onChange={handleChange} />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                            )}
                    </label>
                    {/* Temp */}
                    <p>You can click on "Create Game" below or you can add your first page!</p>
                    <button type="button" onClick={addPage}>Add Page</button>
                </form>
            </section>

            <section className='d-flex add-game-form' id='add-page-sec'>
                <h2>Pages</h2>
                <p>Add pages to your game to create an adventure.</p>
                
                {game.pages.map((page, index) => (
                    
                    <form key={index} className='d-flex' onSubmit={handleSubmit}>
                        
                        <label>
                            <input type="text" placeholder="Page ID" name="page_id" value={page.page_id} onChange={(e) => handlePageChange(index, e)} />
                        </label>
                        <label>
                            <textarea name="content" placeholder="Content" value={page.content} onChange={(e) => handlePageChange(index, e)}></textarea>
                        </label>
                        <label>
                            <input type="text" placeholder="Question" name="question" value={page.question} onChange={(e) => handlePageChange(index, e)} />
                        </label>
                        <label>
                            <input type="text" placeholder="Choices" name="choices" value={page.choices} onChange={(e) => handlePageChange(index, e)} />
                        </label>
                        <label>
                
                            <input type="file" placeholder="Add Image" name="image" onChange={(e) => handlePageChange(index, e)} />
                                {page.imagePreview && (
                                    <img src={page.imagePreview} alt="Img Preview" />
                                )}
                        </label>
                        <button type="button" onClick={() => removePage(index)}>Remove Page</button>
                        <button type="button" onClick={addPage}>Add Page</button>
                    </form>
                    ))}
            </section>
            <footer className='add-game-foot'>
                <form className='d-flex' onSubmit={handleSubmit}>
                    <button type="submit">Create Game</button>
                    <button type="button" onClick={onBack}>Cancel</button>
                    {/* Temp 
                    <button type="button" onClick={addPage}>Add Page</button>
                    */}
                </form>
            </footer>
            
        </section>
    );
}

export default AddGame;
