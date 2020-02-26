//Inicia a API
//Arquivos importados
const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;

// Aumentar o tamanho do conjunto de encadeamentos por poolMax
process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

//Função de inicialização da API
async function startup() {
  console.log('Starting application');

  try {
    console.log('Initializing database module');

    await database.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }

  try {
    console.log('Initializing web server module');

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Código de falha diferente de zero
  }
}

startup();


process.on('SIGINT', () => {
  console.log('Shutting down application');
  process.exit(0);
});