const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // 1. Rota POST (Já está funcionando)
    router.post('/', (req, res) => {
        const { artista_id, id_obra, tipo_midia, titulo, url_arquivo } = req.body;
        if (!url_arquivo) {
            return res.status(400).json({ error: "O campo url_arquivo é obrigatório!" });
        }
        const sql = "INSERT INTO midiasperfil (artista_id, id_obra, tipo_midia, titulo, url_arquivo) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [artista_id, id_obra, tipo_midia, titulo, url_arquivo], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "Mídia inserida com sucesso!", id: result.insertId });
        });
    });

    // 2. Rota GET: Certifique-se de usar exatamente ':artista_id'
    router.get('/:artista_id', (req, res) => {
        const id = req.params.artista_id; // Este nome deve ser igual ao do caminho acima
        console.log("Buscando mídias para o artista ID:", id);

        const sql = "SELECT * FROM midiasperfil WHERE artista_id = ?";
        
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Erro no GET midiasperfil:", err);
                return res.status(500).json(err);
            }
            // Retorna a lista encontrada (Status 200)
            res.status(200).json(result);
        });
    });

    return router;
};