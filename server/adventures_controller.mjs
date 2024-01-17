import * as games from './adventures_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

// Create a new game
app.post('/games', (req, res) => {
    games.createGame(req.body.game_id, req.body.title, req.body.description, req.body.author, req.body.pages)
        .then(game => {
            res.status(201).json(game);
        })
        .catch(error => {
            console.error(error);
        });
});

// Get a game by ID
app.get('/games/:game_id', (req, res) => {
    games.findGameById(req.params.game_id)
        .then(game => {
            if (game) {
                res.json(game);
            } else {
                res.status(404).json({ Error: 'Game not found' });
            }
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });
});

// Update a game
app.put('/games/:game_id', (req, res) => {
    games.updateGame(req.params.game_id, req.body.title, req.body.description, req.body.author, req.body.pages)
        .then(updatedCount => {
            if (updatedCount) {
                res.json({ ...req.body });
            } else {
                res.status(404).json({ Error: 'Game not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

// Delete a game
app.delete('/games/:game_id', (req, res) => {
    games.deleteGame(req.params.game_id)
        .then(deletedCount => {
            if (deletedCount) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Game not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
