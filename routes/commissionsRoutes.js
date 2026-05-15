const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // 1. Rota para criar um novo pedido de commission (POST)
    router.post('/', (req, res) => {
        const { id_cliente, id_artista, detalhes, valor } = req.body;
        
        // O status inicial será 'pendente' por padrão, conforme definido no seu SQL
        const sql = "INSERT INTO commissions (id_cliente, id_artista, detalhes, valor) VALUES (?, ?, ?, ?)";
        
        db.query(sql, [id_cliente, id_artista, detalhes, valor], (err, result) => {
            if (err) return res.status(500).json({ error: "Erro ao criar pedido.", details: err });
            res.status(201).json({ message: 'Pedido de commission criado!', id_pedido: result.insertId });
        });
    });

    // 2. Rota para listar pedidos de um artista específico (GET)
    // Útil para o artista ver o que tem para fazer
    router.get('/artista/:id', (req, res) => {
        const id = req.params.id;
        const sql = "SELECT * FROM commissions WHERE id_artista = ?";
        
        db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    });

    // 3. Rota para atualizar o status do pedido (PATCH)
    // Permite mudar para 'em_andamento', 'finalizado' ou 'cancelado'
    router.patch('/:id/status', (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
        const sql = "UPDATE commissions SET status = ? WHERE id_pedido = ?";
        
        db.query(sql, [status, id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ message: 'Status do pedido atualizado!' });
        });
    });

    return router;
};