const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // Listar todas as categorias (GET)
    router.get('/', (req, res) => {
        db.query("SELECT * FROM categorias", (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    });

    // Criar nova categoria (POST)
    router.post('/', (req, res) => {
        const { nome_categoria } = req.body;
        db.query("INSERT INTO categorias (nome_categoria) VALUES (?)", [nome_categoria], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "Categoria cadastrada!", id: result.insertId });
        });
    });

    return router;
};