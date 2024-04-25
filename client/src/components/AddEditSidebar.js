// client/src/components/AddEditSidebar.js
import React from 'react';

function AddEditSidebar({ game, addPage, onBack, handleSubmit }) {
    return (
        <aside className="add-edit-sidebar">
            <ul>
                <li className='aes-heading'>Content</li>
                <li onClick={() => document.getElementById('game-info-form').scrollIntoView()}><span><i className="far fa-info-square"></i> Game Info</span></li>
                {game.pages.map((page, index) => (
                    <li key={index} onClick={() => document.getElementById(`page-form-${index}`).scrollIntoView()}>
                        <span><i className="far fa-file"></i>{` Page ${index + 1}`}</span>
                    </li>
                ))}
                <li className='aes-heading' id='bar'>Actions</li>
                <li onClick={addPage}><span><i className="far fa-file-plus"></i>Add Page</span></li>
                <li onClick={handleSubmit}><span><i className="far fa-game-console-handheld"></i>Create Game</span></li>
                <li onClick={onBack}><span><i className="fas fa-window-close"></i>Cancel</span></li>
            </ul>1
        </aside>
    );
}

export default AddEditSidebar;
