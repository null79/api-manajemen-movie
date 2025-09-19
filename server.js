const express = require('express');
const cors = require('cors');
const { error } = require('console');

const app = express();
const PORT = 3200;
// // 3
let idSeq = 3;
// // 2
let movies = [
    { id: 1, title: 'parasite', director: 'bong joon-ho', year: 2019 },
    { id: 2, title: 'The dark knight', director: 'nolan', year: 2019 },
    { id: 3, title: 'agak laen', director: 'ernest', year: 2022 },
    { id: 4, title: 'The dark knight', director: 'nolan', year: 2019 },
];

let directors = [
    { id: 1, nama: 'kastoyo', birthyear: 950 },
    { id: 2, nama: 'kaspri', birthyear: 1950 },
];
// middlewere
app.use(cors());
// 3
// middlewere express.json
app.use(express.json());
// route
app.get('/status', (req, res) => {
    res.json({
        ok: true,
        service: 'film-api',
        time: new Date().toISOString()
    });
});
// 2
app.get('/movies', (req, res) => {
    res.json(movies);
});
app.get('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movie = movies.find(m => m.id === id);
    if (!movie) return res.status(404).json({ error: 'Movie tidak ditemukan' });
    res.json(movie);
});
// 3
//POST/movies-Membuatfilmbaru
app.post('/movies', (req, res) => {
    const { title, director, year } = req.body || {};
    if (!title || !director || !year) {
        return res.status(400).json({ error: 'title, director, year wajib diisi' });
    }
    const newMovie = { id: idSeq++, title, director, year };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});
//PUT/movies/:id-Memperbaruidatafilm
app.put('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'movie tidak ditemukan' });
    }
    const { title, director, year } = req.body || {};
    const updateMovie = { id, title, director, year };
    movies[movieIndex] = updateMovie;
    res.json(updateMovie);
});
//DELETE/movies/:id-Menghapusfilm
app.delete('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'movie tidak ditemukan' });
    }
    movies.splice(movieIndex, 1);
    res.status(204).send();
});

//mengamnil satu direktor 
app.get('/directors/:id', (req, res) => {
    const id = Number(req.params.id);
    const directorIndex = director.findIndex(d => d.id === id);
    if (directorIndex === -1) {
        return res.status(404).json({ error: 'director e ilang pak!' });
        res.json(director);
    }
});
// mengambil semua direktor 
app.get('/directors', (req, res) => {
    res.json(directors);
});

// membuat sutradara baru
app.post('/directors', (req, res) => {
    const { nama, birthyear } = req.body;
    if (!nama || !birthyear) {
        return res.status(400).json({ error: 'nama, birthyear wajib diisi' });
    }
    const newdirektor = { id: idSeq++, nama, birthyear };
    directors.push(newdirektor);
    res.status(201).json(newdirektor);
});

// PUT
app.put('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'movie tidak ditemukan' });
    }
    const { title, director, year } = req.body || {};
    const updateMovie = { id, title, director, year };
    movies[movieIndex] = updateMovie;
    res.json(updateMovie);
});

//DELLETE
app.delete('/movies/:id', (req, res) => {
    const id = Number(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'movie tidak ditemukan' });
    }
    movies.splice(movieIndex, 1);
    res.status(204).send();
});


// middleware fallback untuk menangani rute 404 Not found 
app.use((req, res) => {
    res.status(404).json({ error: 'Rute tidak ditemukan' });
});
// 4
app.use((err, req, res, _next) => {
    console.error('[EROR]')
});
// Start server
app.listen(PORT, () => {
    console.log(`Server aktif di http://localhost:${PORT}/movies`);
});