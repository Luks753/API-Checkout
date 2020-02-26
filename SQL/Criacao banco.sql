create database if not exists  apishop;

use apishop;

SET FOREIGN_KEY_CHECKS = 0;

CREATE table PRODUTO 
	(
		id integer auto_increment,
        nome varchar(100),
        peso integer,
        categoria varchar(80),
        quantidade integer,
        preco integer,
		primary key  (id)
    );
    
    /*SMARTPHONES*/
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'Smartphone Xiaomi Redmi Note 8',
    440,
    'Smartphone',
    14,
    1379
    );
    
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'iPhone 8 Plus Prateado',
    490,
    'Smartphone',
    20,
    3499
    );
    
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'Smartphone Samsung Galaxy A70',
    350,
    'Smartphone',
    12,
    1825
    );
    
    /*NOTEBOOKS*/
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'Notebook Acer Aspire 5 A515-52-56A8',
    2640,
    'Notebook',
    20,
    2899
    );
    
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'Notebook HP 246 G6',
    2400,
    'Notebook',
    13,
    2349
    );
    
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'Notebook Acer Aspire 3',
    2790,
    'Notebook',
    17,
    1799
    );
    
    /*HARDWARE*/
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'Placa-Mãe Asus EX-A320M-Gaming',
    925,
    'Hardware',
    12,
    406
    );
    
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'SSD Kingston A400',
    70,
    'Hardware',
    16,
    199
    );
    
    INSERT INTO PRODUTO (nome,peso,categoria,quantidade,preco) VALUES(
    'Processador Intel Core i5-9400F Coffee Lake',
    290,
    'Hardware',
    10,
    839
    );
