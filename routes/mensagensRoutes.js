const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // POST - Enviar (Já funcionando)
    router.post('/', (req, res) => {
        const { id_remetente, id_destinatario, conteudo } = req.body;
        const sql = "INSERT INTO mensagens (id_remetente, id_destinatario, conteudo) VALUES (?, ?, ?)";
        db.query(sql, [id_remetente, id_destinatario, conteudo], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "Mensagem enviada!" });
        });
    });

    // GET - Buscar mensagens (Onde o 404 está ocorrendo)
    // ATENÇÃO: O ":" é obrigatório para o Express entender que o ID é variável
    router.get('/:id_destinatario', (req, res) => {
        const id = req.params.id_destinatario;
        const sql = "SELECT * FROM mensagens WHERE id_destinatario = ?";

        db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    });

    return router;
};