const express = require('express');
const cors = require('cors');
const res = require ("express/lib/response");
const db_genshin = require('./db_genshin');

const app = express();
app.use(express.json())

app.use(cors());

app.get ('/Personagem', (req, res) => {
    db_genshin.all('SELECT * FROM Personagem', (erro, Personagem) => {
        if (erro != null) {
            console.error(erro);
            res.status(500).json({mensagem: 'Erro no Servidor'})
        } else {
            res.json(Personagem)
        }
    });
});

app.post('/Personagem', (req, res) => {
    const {id, nome, elemento, arma, imagem} = req.body
    db_genshin.run('insert into Personagem (id, nome, elemento, arma, imagem) values (?,?,?,?,?)', [id, nome, elemento, arma, imagem], (erro) => {
        if (erro != null) {
            console.erro(erro);
            res.status(500).json({mensagem: 'Ocorreu um erro no Servidor'});
        } else {
            res.status(201).json({id: id, nome: nome, elemento: elemento, arma: arma})
        }
    })
});

app.delete ('/Personagem', (req, res) => {
    const id = req.body.id
    db_genshin.run('delete from Personagem where id= (?)', [id], (erro) => {
        if (erro != null) {
            console.erro(erro);
            res.status(500).json({mensagem: 'Ocorreu um erro no Servidor'});
        } else {
            res.status(201).json({Mensagem: 'Personagem Deletado com Sucesso!'})
        }        
    })
})

app.patch('/Personagem', (req, res) => {
    const { id, novoNome, novoElemento, novaArma, novaImagem } = req.body;

    if (novoNome != null) {
        db_genshin.run('UPDATE Personagem SET nome = ? WHERE id = ?', [novoNome, id]);
    } if (novoElemento != null) {
        db_genshin.run('UPDATE Personagem SET elemento = ? WHERE id = ?', [novoElemento, id]);
    } if (novaArma != null) {
        db_genshin.run('UPDATE Personagem SET arma = ? WHERE id = ?', [novaArma, id]);
    } if (novaImagem != null) {
        db_genshin.run('UPDATE Personagem SET imagem = ? WHERE id = ?', [novaImagem, id]);
    } 
    res.status(201).json({Mensagem: 'Personagem Alterado com Sucesso!'})
});
           

app.listen(3030, () => {
    console.log('Servidor Executando em localhost:3030')
})