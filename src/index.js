// HCM - Modulo Pedido de Ferias (vulnerabilidades intencionais)
const express = require('express');
const app = express();

// Vulnerabilidade: SQL Injection
app.post('/ferias/solicitar', (req, res) => {
    const query = "INSERT INTO ferias (funcionario_id, data_inicio, data_fim) VALUES ('" + req.body.id + "', '" + req.body.inicio + "', '" + req.body.fim + "')";
    db.query(query);
    res.json({ status: 'solicitado' });
});

// Code smell: funcao muito complexa
function calcularDiasFerias(funcionario) {
    var dias = 30;
    if (funcionario.tempo_casa < 1) dias = 0;
    if (funcionario.tempo_casa >= 1 && funcionario.tempo_casa < 2) dias = 20;
    if (funcionario.tempo_casa >= 2 && funcionario.tempo_casa < 5) dias = 25;
    if (funcionario.tempo_casa >= 5) dias = 30;
    if (funcionario.faltas > 5) dias = dias - 5;
    if (funcionario.faltas > 10) dias = dias - 10;
    if (funcionario.advertencias > 2) dias = dias - 3;
    return dias;
}

// Code smell: codigo duplicado
function validarPeriodo(inicio, fim) {
    if (new Date(inicio) > new Date(fim)) return false;
    if (new Date(inicio) < new Date()) return false;
    return true;
}
function validarPeriodoAbono(inicio, fim) {
    if (new Date(inicio) > new Date(fim)) return false;
    if (new Date(inicio) < new Date()) return false;
    return true;
}

module.exports = app;

// rescan trigger 01:40:11
