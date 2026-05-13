const express = require('express');
const router = express.Router();

module.exports = (db) => {
    
    // 1. Rota para listar todas as obras (Feed Geral)
    router.get('/', (req, res) => {
        const sql = `
            SELECT p.*, a.nome as nome_artista 
            FROM portfolio p 
            JOIN artistas a ON p.id_artista = a.id_artista
        `;
        db.query(sql, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    });

    // 2. Rota para cadastrar uma nova obra
    router.post('/', (req, res) => {
        const { id_artista, titulo, descricao, url_imagem } = req.body;
        const sql = "INSERT INTO portfolio (id_artista, titulo, descricao, url_imagem) VALUES (?, ?, ?, ?)";
        
        db.query(sql, [id_artista, titulo, descricao, url_imagem], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Obra adicionada!', id: result.insertId });
        });
    });

    // 3. Rota para listar obras de UM artista específico
    // ELA PRECISA FICAR AQUI DENTRO PARA USAR O 'db'
    router.get('/artista/:id', (req, res) => {
        const id = req.params.id; 
        const sql = `
            SELECT p.*, a.nome as nome_artista 
            FROM portfolio p 
            JOIN artistas a ON p.id_artista = a.id_artista
            WHERE p.id_artista = ?
        `;

        db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    });

    return router;
};