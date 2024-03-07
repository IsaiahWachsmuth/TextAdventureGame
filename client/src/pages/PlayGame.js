import React, { useState, useEffect } from 'react';

const PlayGamePage = () => {
    const [gameInfo, setGameInfo] = useState(null);

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
                    console.log(gameInfo)
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

    useEffect(() => {
        console.log(gameInfo);
    }, [gameInfo]);

    return (
        <div>
            {gameInfo && (
                <div>
                    <h3> {gameInfo.title} </h3>
                    <h3> {gameInfo.pages[0].content} </h3>
                    <h3> {gameInfo.pages[0].question} </h3>
                </div>
            )}
        </div>
    );
};

export default PlayGamePage;
    