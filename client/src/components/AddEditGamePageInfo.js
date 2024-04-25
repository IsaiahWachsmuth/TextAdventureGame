// client/src/components/AddEditGamePageInfo.js
import React from 'react';

function AddEditGamePageInfo({ index, page, game, setGame, handlePageChange, removePage }) { // Destructure `removePage` here
    const addChoice = () => {
        const newPages = [...game.pages];
        newPages[index].choices.push({ text: '', isCorrect: false, pageNav: '' });
        setGame({ ...game, pages: newPages });
    };

    const removeChoice = (choiceIndex) => {
        const newPages = [...game.pages];
        newPages[index].choices.splice(choiceIndex, 1);
        setGame({ ...game, pages: newPages });
    };

    return (
        <form id={`page-form-${index}`} className="add-edit-form" onSubmit={(e) => e.preventDefault()}>
            <h3>{`Page ${index + 1}`}</h3>
            <input type="text" placeholder="Page ID" name="page_id" value={page.page_id} onChange={(e) => handlePageChange(index, e)} />
            <textarea name="content" placeholder="Content" value={page.content} onChange={(e) => handlePageChange(index, e)}></textarea>
            <input type="text" placeholder="Question" name="question" value={page.question} onChange={(e) => handlePageChange(index, e)} />
            {page.choices.map((choice, choiceIndex) => (
                <div key={`choice-${index}-${choiceIndex}`}>
                    <input
                        type="text"
                        placeholder={`Choice ${choiceIndex + 1}`}
                        name={`choices-text-${index}-${choiceIndex}`}
                        value={choice.text}
                        onChange={(e) => handlePageChange(index, e)}
                    />
                    <select
                        name={`choices-nav-${index}-${choiceIndex}`}
                        value={choice.pageNav || ''}
                        onChange={(e) => handlePageChange(index, e)}
                    >
                        <option value="">Select Page</option>
                        {game.pages.map((p, idx) => (
                            <option key={idx} value={p.page_id}>{p.page_id}</option>
                        ))}
                    </select>
                    <input
                        type="radio"
                        name={`choices-correct-${index}`}
                        value={choiceIndex}
                        checked={choice.isCorrect}
                        onChange={(e) => handlePageChange(index, e)}
                    /> Correct
                    <button type="button" onClick={() => addChoice()}>Add Choice</button>
                    {page.choices.length > 1 && (
                        <button type="button" onClick={() => removeChoice(choiceIndex)}>Remove Choice</button>
                    )}
                </div>
            ))}
            <input type="file" placeholder="Add Image" name="image" onChange={(e) => handlePageChange(index, e)} />
            {page.imagePreview && (
                <img src={page.imagePreview} alt="Img Preview" style={{ maxWidth: '100%', height: 'auto' }} />
            )}
            <button type="button" onClick={() => removePage(index)}>Remove Page</button>
        </form>
    );
}

export default AddEditGamePageInfo;
