import React, { useState, useEffect } from 'react';

function AddGame({ onBack }) {
    const [game, setGame] = useState({ title: '', description: '', author: '', pages: [] });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (image) {
            const previewUrl = URL.createObjectURL(image);
            setImagePreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [image]);

    const handleChange = (event) => {
        if (event.target.name === 'image') {
            setImage(event.target.files[0]);
        } else {
            setGame({ ...game, [event.target.name]: event.target.value });
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
                pages[index][name] = imageData;
                pages[index]['imagePreview'] = URL.createObjectURL(file);
                setGame({ ...game, pages });
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        } else if (name.startsWith('choices')) {
            // Assuming a naming convention of 'choices-<pageIndex>-<choiceIndex>'
            let choiceIndex = parseInt(name.split('-')[2], 10);
            pages[index].choices[choiceIndex] = value;
        } else {
            pages[index][name] = value;
        }
        setGame({ ...game, pages });
    };

    const addPage = () => {
        setGame({
            ...game,
            pages: [...game.pages, { page_id: '', content: '', question: '', choices: [''], image: '' }]
        });
    };

    const addChoice = (pageIndex) => {
        const newPages = [...game.pages];
        newPages[pageIndex].choices.push('');
        setGame({ ...game, pages: newPages });
    };

    const removeChoice = (pageIndex, choiceIndex) => {
        const newPages = [...game.pages];
        newPages[pageIndex].choices.splice(choiceIndex, 1);
        setGame({ ...game, pages: newPages });
    };

    const removePage = (index) => {
        const pages = [...game.pages];
        pages.splice(index, 1);
        setGame({ ...game, pages });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', game.title);
        formData.append('description', game.description);
        formData.append('author', game.author);
        game.pages.forEach((page, index) => {
            Object.entries(page).forEach(([key, value]) => {
                if (key !== 'choices') {
                    formData.append(`pages[${index}][${key}]`, value);
                } else {
                    page.choices.forEach((choice, choiceIndex) => {
                        formData.append(`pages[${index}][choices][${choiceIndex}]`, choice);
                    });
                }
            });
        });
        if (image) formData.append('image', image);
    
        try {
            const response = await fetch('http://localhost:3001/games', {
                method: 'POST',
                body: formData, // Send formData instead of JSON
                credentials: 'include',
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
                        <label className='d-flex add-game-form'>
                            {page.choices.map((choice, choiceIndex) => (
                                <input
                                    key={`choice-${index}-${choiceIndex}`}
                                    type="text"
                                    placeholder={`Choice ${choiceIndex + 1}`}
                                    name={`choices-${index}-${choiceIndex}`}
                                    value={choice}
                                    onChange={(e) => handlePageChange(index, e)}
                                />
                            ))}
                            <button type="button" onClick={() => addChoice(index)}>Add Choice</button>
                            {page.choices.length > 1 && (
                                <button type="button" onClick={() => removeChoice(index, page.choices.length - 1)}>Remove Choice</button>
                            )}
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
