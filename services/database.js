//Configura a conexão com o banco
//Plugin do banco
const mysql = require('mysql');

//Arquivos importados
const dbConfig = require('../config/database.js');


//Função que inicia o pool de conexões
async function initialize() {
  await mysql.createPool(dbConfig.hrPool);
}

module.exports.initialize = initialize;

//Função que conecta com o banco e executa as consultas
function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await mysql.createConnection(dbConfig.hrPool);


      await db.query(statement, binds, function (error, results, opts) {
        if (error) console.log(error);
        resolve(results);
      });

    } catch (err) {
      reject(err);
    } finally {
      if (db) { // processo executado, precisa fechar
        try {
          await db.end();
          console.log("Closed connection.");
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.simpleExecute = simpleExecute;