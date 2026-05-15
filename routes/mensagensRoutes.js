const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // 1. Rota para enviar uma mensagem (POST)
    router.post('/', (req, res) => {
        const { id_remetente, id_destinatario, conteudo, id_pedido } = req.body;
        const sql = "INSERT INTO mensagens (id_remetente, id_destinatario, conteudo, id_pedido) VALUES (?, ?, ?, ?)";
        
        db.query(sql, [id_remetente, id_destinatario, conteudo, id_pedido], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Mensagem enviada!', id_mensagem: result.insertId });
        });
    });

    // 2. Rota para ler o histórico de mensagens de um pedido (GET)
    router.get('/pedido/:id', (req, res) => {
        const id = req.params.id;
        const sql = "SELECT * FROM mensagens WHERE id_pedido = ? ORDER BY data_envio ASC";
        
        db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    });

    return router;
};