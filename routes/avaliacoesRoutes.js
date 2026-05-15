const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // 1. Rota para avaliar uma encomenda finalizada (POST)
    router.post('/', (req, res) => {
        const { id_pedido, nota, comentario } = req.body;
        
        // Verificação da regra de negócio (nota entre 1 e 5)
        if (nota < 1 || nota > 5) {
            return res.status(400).json({ message: "A nota deve ser entre 1 e 5." });
        }

        // SQL focado no id_pedido conforme sua tabela
        const sql = "INSERT INTO avaliacoes (id_pedido, nota, comentario) VALUES (?, ?, ?)";
        
        db.query(sql, [id_pedido, nota, comentario], (err, result) => {
            if (err) {
                // Erro comum: tentar avaliar um id_pedido que não existe em commissions
                return res.status(500).json({ error: "Erro ao inserir avaliação. O pedido existe?", details: err });
            }
            res.status(201).json({ message: 'Avaliação registrada com sucesso!', id: result.insertId });
        });
    });

    // 2. Rota para buscar a nota média de um artista (Data Science!)
    router.get('/artista/:id_artista', (req, res) => {
        const id = req.params.id_artista;
        const sql = `
            SELECT AVG(a.nota) as media_reputacao, COUNT(a.id_avaliacao) as total_feedbacks
            FROM avaliacoes a
            JOIN commissions c ON a.id_pedido = c.id_pedido
            WHERE c.id_artista = ?
        `;
        
        db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result[0]);
        });
    });

    return router;
};