const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Rota para seguir um artista
    router.post('/seguir', (req, res) => {
        const { id_seguidor, id_seguido } = req.body;
        const sql = "INSERT INTO seguidores (id_seguidor, id_seguido) VALUES (?, ?)";
        
        db.query(sql, [id_seguidor, id_seguido], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Agora você está seguindo este artista!' });
        });
    });

    // Rota para contar seguidores de um artista (Útil para o perfil)
    router.get('/contar/:id', (req, res) => {
        id = req.params.id;
        const sql = "SELECT COUNT(*) as total_seguidores FROM seguidores WHERE id_seguido = ?";
        
        db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result[0]);
        });
    });

    return router;
};