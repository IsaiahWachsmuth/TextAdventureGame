import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as games from './adventures_model.mjs';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, '/uploads');
fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(uploadDir));

app.post('/games', upload.single('image'), (req, res) => {
    const { game_id, title, description, author, pages } = req.body;
    const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

    games.createGame(game_id, title, description, author, pages, image)
        .then(game => res.status(201).json(game))
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error creating new game' });
        });
});

app.put('/games/:game_id', upload.single('image'), (req, res) => {
    const { title, description, author, pages } = req.body;
    const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : undefined; // undefined indicates no new image uploaded

    games.updateGame(req.params.game_id, title, description, author, pages, image)
        .then(updatedGame => {
            if (updatedGame) {
                res.json(updatedGame);
            } else {
                res.status(404).json({ Error: 'Game not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

app.get('/games', (req, res) => {
    games.findAllGames()
        .then(games => res.json(games))
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Failed to fetch games' });
        });
});

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
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

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
