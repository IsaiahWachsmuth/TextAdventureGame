import React, { useState, useEffect } from 'react';

const PlayGamePage = () => {
    const [gameInfo, setGameInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fullPathname = window.location.pathname;
            const pathParts = fullPathname.split('/');
            const classcode = pathParts[pathParts.length - 1];

            try {
                const url = 'http://localhost:3001/games/checkClassCode';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: classcode,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setGameInfo(data.game);
                    setCurrentPage(data.game.pages[0]); // Set initial page

                } else {
                    setGameInfo("No such game exists!");
                    alert("NO SUCH GAME EXISTS");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setGameInfo("Error fetching data");
                
            }
        };

        fetchData();
    }, []);

    const handleOptionClick = (choice) => {

        let nextPage = null;


        for (let i = 0; i < gameInfo.pages.length; i++) {

            if(parseInt(gameInfo.pages[i].page_id, 10) === parseInt(choice.pageNav, 10))
            {
                nextPage = gameInfo.pages[i];
                break;
            }
        }
        


        // gameInfo.pages.forEach(page => {
        //     const foundChoice = page.choices.find(ch => ch.pageNav === choice.pageNav);
        //     console.log(page.choices[0].pageNav)
        //     if (foundChoice) {
        //         nextPage = gameInfo.pages.find(p => p.page_id === foundChoice.pageNav);
        //     }
        // });


        if (nextPage) {
            setCurrentPage(nextPage);
            console.log("CurrentPage");
        }
        
        else{
            console.log("DOESNT EXIST");
        }
    };

    return (
        <div>
            {currentPage && (
                <div>
                    <h3> {gameInfo.title} </h3>
                    <h3> {currentPage.content} </h3>
                    <h3> {currentPage.question} </h3>
                    {currentPage.choices && currentPage.choices[0].text.length > 0 ? (
                    <div>
                        {currentPage.choices.map((choice, index) => (
                            <button key={index} onClick={() => handleOptionClick(choice)}>
                                {choice.text}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p>No options available.</p>
                )}
                </div>
            )}
        </div>
    );
};

export default PlayGamePage;
    