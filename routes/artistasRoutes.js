const express = require('express');
const router = express.Router();

// Aqui você precisará passar a conexão 'db' ou importá-la
module.exports = (db) => {
    // Listar artistas
    router.get('/', (req, res) => {
        const sql = "SELECT * FROM artistas";
        db.query(sql, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    });

    return router;
};