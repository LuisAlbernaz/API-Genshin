const sqlite3 = require ('sqlite3').verbose();
const db_genshin = new sqlite3.Database('./genshin.db')

db_genshin.serialize( () => {
    db_genshin.run (`CREATE TABLE IF NOT EXISTS Personagem (
        id integer primary key,
        nome varchar(100),
        elemento varchar(50),
        arma varchar(50),
        imagem text
    )
    `)
});

module.exports = db_genshin;