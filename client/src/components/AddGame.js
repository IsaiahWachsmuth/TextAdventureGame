// client/src/components/AddGame.js
import React, { useState } from 'react';
import AddEditSidebar from './AddEditSidebar';
import AddEditGameInfo from './AddEditGameInfo';
import AddEditGamePageInfo from './AddEditGamePageInfo';

function AddGame({ onBack }) {
    const [game, setGame] = useState({ title: '', description: '', author: '', pages: [] });
    const [image, setImage] = useState(null);

    // Handle changes in the game info fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'image') {
            setImage(event.target.files[0]);
        } else {
            setGame({ ...game, [event.target.name]: value });
        }
    };

    // Handle changes in the page fields, including dynamic choices
    const handlePageChange = (pageIndex, event) => {
        const { name, value, type, files } = event.target;
        const pages = [...game.pages];
        const page = pages[pageIndex];
    
        if (type === 'file' && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                page.image = e.target.result; // Store Base64 string
                page.imagePreview = URL.createObjectURL(file); // Update preview for display
                setGame({ ...game, pages });
            };
            reader.readAsDataURL(file);
        } else if (name.startsWith('choices-')) {
            const choiceIndex = parseInt(name.split('-')[3], 10);
            if (name.includes('text')) {
                page.choices[choiceIndex].text = value;
            } else if (name.includes('nav')) {
                page.choices[choiceIndex].pageNav = value;
            } else if (name.includes('correct')) {
                page.choices.forEach((choice, idx) => {
                    choice.isCorrect = (idx === choiceIndex);
                });
            }
        } else {
            page[name] = value;
        }
        setGame({ ...game, pages });
    };

    // Add a new blank page to the game
    const addPage = () => {
        setGame({
            ...game,
            pages: [...game.pages, { page_id: '', content: '', question: '', choices: [{ text: '', isCorrect: false, pageNav: '' }], image: null, imagePreview: null }]
        });
    };

    // Remove a page from the game
    const removePage = (pageIndex) => {
        const newPages = [...game.pages];
        newPages.splice(pageIndex, 1);
        setGame({ ...game, pages: newPages });
    };

    /* Known good handleSubmit function
    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', game.title);
        formData.append('description', game.description);
        formData.append('author', game.author);
        if (image) {
            formData.append('image', image);
        }
    
        game.pages.forEach((page, index) => {
            formData.append(`pages[${index}][page_id]`, page.page_id);
            formData.append(`pages[${index}][content]`, page.content);
            formData.append(`pages[${index}][question]`, page.question);
            if (page.image && page.image instanceof File) { // Ensure the object is a File
                formData.append(`pages[${index}][image]`, page.image, page.image.name);
            }
            page.choices.forEach((choice, choiceIndex) => {
                formData.append(`pages[${index}][choices][${choiceIndex}][text]`, choice.text);
                formData.append(`pages[${index}][choices][${choiceIndex}][isCorrect]`, choice.isCorrect);
                formData.append(`pages[${index}][choices][${choiceIndex}][pageNav]`, choice.pageNav);
            });
        });
    
        try {
            const response = await fetch('http://localhost:3001/games', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            if (response.ok) {
                onBack();
            } else {
                console.error('Error, returning anyway');
                onBack();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
   */ 

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', game.title);
        formData.append('description', game.description);
        formData.append('author', game.author);
        if (image && image instanceof File) {
            formData.append('image', image);
        }
    
        game.pages.forEach((page, index) => {
            // Append simple string fields directly
            formData.append(`pages[${index}][page_id]`, page.page_id);
            formData.append(`pages[${index}][content]`, page.content);
            formData.append(`pages[${index}][question]`, page.question);
    
            // Append the image if it's a file
            if (page.image) {
                formData.append(`pages[${index}][image]`, page.image); // Assuming this is now a Base64 string
            }
    
            // Handle choices array
            page.choices.forEach((choice, choiceIndex) => {
                formData.append(`pages[${index}][choices][${choiceIndex}][text]`, choice.text);
                formData.append(`pages[${index}][choices][${choiceIndex}][isCorrect]`, choice.isCorrect.toString());
                if (choice.pageNav) {
                    formData.append(`pages[${index}][choices][${choiceIndex}][pageNav]`, choice.pageNav);
                }
            });
        });
    
        try {
            const response = await fetch('http://localhost:3001/games', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            if (response.ok) {
                onBack(); // Navigate back or handle success
            } else {
                console.error('Error, returning anyway');
                onBack();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className='add-game-wrap'>
            <AddEditSidebar game={game} addPage={addPage} onBack={onBack} handleSubmit={handleSubmit} /> {/* Passing handleSubmit here */}
            <div className="main-content">
                <AddEditGameInfo game={game} image={image} setImage={setImage} handleChange={handleChange} handleSubmit={handleSubmit} />
                {game.pages.map((page, index) => (
                    <AddEditGamePageInfo key={index} index={index} page={page} game={game} setGame={setGame} handlePageChange={handlePageChange} removePage={removePage} />
                ))}
            </div>
        </div>
    );
}

export default AddGame;
