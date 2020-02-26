//Repositório de funções que se comunicam com o banco
//Imports
const database = require('../services/database.js');


//Função que pega todos os produtos ou um produto específico se for passado o ID.
async function getProduct(context) {
  let query = "SELECT * FROM PRODUTO";

  if (context.productId) {
    query += ` WHERE ID = ${context.productId}`;
  }

  const result = await database.simpleExecute(query);

  return result;
}

module.exports.getProduct = getProduct;