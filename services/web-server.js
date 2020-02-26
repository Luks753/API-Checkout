//Configuração do servidor

//Plugins
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cluster = require('cluster');

//Arquivos importados
const webServerConfig = require('../config/web-server.js');
const database = require('./database.js');
const router = require('./router.js');

//Quantidade de núcleos do processador para implementação de cluster
const numCPUs = require('os').cpus().length;

let httpServer;

//Função de inicialização do servidor
function initialize() {
  return new Promise((resolve, reject) => {

    const app = express();

    if (cluster.isMaster) {
      console.log('Master process is running');

      // Fork workers
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
      });

    } else {
      httpServer = http.createServer(app);

      httpServer.listen(webServerConfig.port)
        .on('listening', () => {
          console.log(`Web server listening on localhost:${webServerConfig.port}`);

          resolve();
        })
        .on('error', err => {
          reject(err);
        });
    }

    // Combina informações de registro de solicitação e resposta
    app.use(morgan('combined'));

    // Montar o roteador em / api para que todas as rotas comecem com / api
    app.use('/api', router);

    //Página inicial do servidor mostra o usuário que está conectado ao banco
    app.get('/', async (req, res) => {
      const result = await database.simpleExecute('SELECT CURRENT_USER');
      const user = result[0].CURRENT_USER;

      res.end('DB user: ' + user);
    });


  });
}

module.exports.initialize = initialize;