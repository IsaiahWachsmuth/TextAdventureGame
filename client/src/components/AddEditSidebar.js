// client/src/components/AddEditSidebar.js
import React from 'react';

function AddEditSidebar({ game, addPage, onBack, handleSubmit }) {
    return (
        <aside className="add-edit-sidebar">
            <ul>
                <li onClick={() => document.getElementById('game-info-form').scrollIntoView()}>Game Info</li>
                {game.pages.map((page, index) => (
                    <li key={index} onClick={() => document.getElementById(`page-form-${index}`).scrollIntoView()}>
                        {`Page ${index + 1}`}
                    </li>
                ))}
                <li onClick={addPage}>Add Page</li>
                <li onClick={handleSubmit}>Create Game</li>
                <li onClick={onBack}>Cancel</li>
            </ul>
        </aside>
    );
}

export default AddEditSidebar;
