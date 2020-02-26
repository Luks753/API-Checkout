//Arquivos importados
const cart = require('../db_apis/CartDB.js');

//Função que calcula o valor do carrinho baseado no cupom de desconto
async function computeCart(coupon, products) {
    let total = 0;
    let freight = 0;
    let discount = 0;

    //Checa se o cupom utilizado se aplica em alguma das regras
    switch (coupon) {

        case 'FRETEGRATIS': //Frete grátis para qualquer produto.
            for (let product of products) {
                let prod = await cart.getProduct(product)

                //Checa se o produto tem quantidade disponível no estoque
                if (prod[0].quantidade < product.quantity || product.quantity <= 0) {
                    return {
                        status: 'ERROR',
                        message: `NÃO FOI POSSÍVEL APLICAR O DESCONTO. QUANTIDADE SOLICITADA DO ITEM ${prod[0].nome} ESTÁ INDISPONÍVEL NO ESTOQUE`
                    }
                }
                total += prod[0].preco * product.quantity;
                freight += 17.9 * product.quantity * (prod[0].peso / 1000)
            }
            return {
                status: 'SUCCESS',
                total: parseFloat((total + freight).toFixed(2)),
                totaldisc: parseFloat((total).toFixed(2)),
                discount: parseFloat((freight).toFixed(2))
            };

        case 'FRETEGRATISNB': //Frete grátis apenas para notebooks.
            for (let product of products) {
                let prod = await cart.getProduct(product)

                //Checa se o produto tem quantidade disponível no estoque
                if (prod[0].quantidade < product.quantity || product.quantity <= 0) {
                    return {
                        status: 'ERROR',
                        message: `NÃO FOI POSSÍVEL APLICAR O DESCONTO. QUANTIDADE SOLICITADA DO ITEM ${prod[0].nome} ESTÁ INDISPONÍVEL NO ESTOQUE`
                    }
                }
                total += prod[0].preco * product.quantity;
                let freightprod = 17.9 * product.quantity * (prod[0].peso / 1000)

                //Aplica desconto se o produto for da categoria promocional
                if (prod[0].categoria == 'Notebook') {
                    discount += freightprod;
                }
                freight += freightprod;
            }
            //Checa se existe produto da categoria promocional no carrinho
            if (discount > 0) {
                return {
                    status: 'SUCCESS',
                    total: parseFloat((total + freight).toFixed(2)),
                    totaldisc: parseFloat((total + freight - discount).toFixed(2)),
                    discount: parseFloat((discount).toFixed(2))
                };
            } else {
                return {
                    status: 'ERROR',
                    message: 'NÃO FOI POSSÍVEL APLICAR O DESCONTO. PRODUTOS PROMOCIONAIS NÃO CONSTAM NO CARRINHO.'
                }
            }

        case 'BONUSMIN': //Frete grátis para qualquer produto caso o carrinho tenha um valor acima de R$ 300,00.
            for (let product of products) {
                let prod = await cart.getProduct(product)

                //Checa se o produto tem quantidade disponível no estoque
                if (prod[0].quantidade < product.quantity || product.quantity <= 0) {
                    return {
                        status: 'ERROR',
                        message: `NÃO FOI POSSÍVEL APLICAR O DESCONTO. QUANTIDADE SOLICITADA DO ITEM ${prod[0].nome} ESTÁ INDISPONÍVEL NO ESTOQUE`
                    }
                }
                total += (prod[0].preco * product.quantity);
                let freightprod = 17.9 * product.quantity * (prod[0].peso / 1000)
                freight += freightprod;
            }
            //Checa se o carrinho tem valor mínimo aceitável para o desconto
            if (total > 300) {
                discount = freight;
                return {
                    status: 'SUCCESS',
                    total: parseFloat((total + freight).toFixed(2)),
                    totaldisc: parseFloat((total + freight - discount).toFixed(2)),
                    discount: parseFloat((discount).toFixed(2))
                };
            } else {
                return {
                    status: 'ERROR',
                    message: 'NÃO FOI POSSÍVEL APLICAR O DESCONTO. O VALOR DO CARRINHO É MENOR QUE O ESPERADO.'
                }
            }

        case 'FRETE15OFF': //frete grátis para qualquer produto da loja + 15% de desconto no valor do produto promocional.

            for (let product of products) {
                let prod = await cart.getProduct(product)

                //Checa se o produto tem quantidade disponível no estoque
                if (prod[0].quantidade < product.quantity || product.quantity <= 0) {
                    return {
                        status: 'ERROR',
                        message: `NÃO FOI POSSÍVEL APLICAR O DESCONTO. QUANTIDADE SOLICITADA DO ITEM ${prod[0].nome} ESTÁ INDISPONÍVEL NO ESTOQUE`
                    }
                }
                //Checa se o produto é promocional e aplica o desconto
                if (prod[0].id == 1) {
                    total += (prod[0].preco * 0.85) * product.quantity;
                    discount = (prod[0].preco * 0.15) * product.quantity
                } else {
                    total += prod[0].preco * product.quantity;
                }
                let freightprod = 17.9 * product.quantity * (prod[0].peso / 1000)
                freight += freightprod;
            }

            //Checa se o produto promocional consta no carrinho
            if (discount > 0) {
                return {
                    status: 'SUCCESS',
                    total: parseFloat((total + freight).toFixed(2)), totaldisc: parseFloat((total + freight - discount).toFixed(2)), discount: parseFloat((discount).toFixed(2))
                };
            } else {
                return {
                    status: 'ERROR',
                    message: 'NÃO FOI POSSÍVEL APLICAR O DESCONTO. PRODUTO PROMOCIONAL NÃO CONSTA NO CARRINHO.'
                }
            }

        case '3POR2': //Adicionando 3 produtos iguais, o 3° não será cobrado.
            for (let product of products) {
                let prod = await cart.getProduct(product)

                //Checa se o produto tem quantidade disponível no estoque
                if (prod[0].quantidade < product.quantity || product.quantity <= 0) {
                    return {
                        status: 'ERROR',
                        message: `NÃO FOI POSSÍVEL APLICAR O DESCONTO. QUANTIDADE SOLICITADA DO ITEM ${prod[0].nome} ESTÁ INDISPONÍVEL NO ESTOQUE`
                    }
                }
                total += prod[0].preco * product.quantity;
                let freightprod = 17.9 * product.quantity * (prod[0].peso / 1000)
                freight += freightprod;

                //Checa se o produto tem a quantidade necessária para o desconto
                if (product.quantity >= 3) {
                    discount += prod[0].preco
                }
            }

            //Checa se existe a quantidade de itens necessária para aplicar a promoção
            if (discount > 0) {
                return {
                    status: 'SUCCESS',
                    total: parseFloat((total + freight).toFixed(2)),
                    totaldisc: parseFloat((total + freight - discount).toFixed(2)),
                    discount: parseFloat((discount).toFixed(2))
                };
            } else {
                return { status: 'ERROR', message: 'NÃO FOI POSSÍVEL APLICAR O DESCONTO. QUANTIDADE DE ITENS NÃO É SUFICIENTE PARA APLICAR O CUPOM' }
            }

        case '3POR2HARDWARE': //Adicionando 3 produtos da mesma categoria, o produto com o menor valor não será cobrado.
            let hardware = 0;
            for (let product of products) {
                let prod = await cart.getProduct(product)

                //Checa se o produto tem quantidade disponível no estoque
                if (prod[0].quantidade < product.quantity || product.quantity <= 0) {
                    return {
                        status: 'ERROR',
                        message: `NÃO FOI POSSÍVEL APLICAR O DESCONTO. QUANTIDADE SOLICITADA DO ITEM ${prod[0].nome} ESTÁ INDISPONÍVEL NO ESTOQUE`
                    }
                }
                total += prod[0].preco * product.quantity;
                let freightprod = 17.9 * product.quantity * (prod[0].peso / 1000)
                freight += freightprod;

                //Checa a quantidade de produtos da categoria da promoção
                if (prod[0].categoria == 'Hardware') {
                    hardware += product.quantity;

                    //Guarda o produtos com menor valor para aplicar o discount
                    if (discount == 0 || discount > prod[0].preco) {
                        discount = prod[0].preco;
                    }
                }
            }

            //Checa se existe a quantidade de itens necessária para aplicar a promoção
            if (hardware >= 3) {
                return {
                    status: 'SUCCESS',
                    total: parseFloat((total + freight).toFixed(2)),
                    totaldisc: parseFloat((total + freight - discount).toFixed(2)),
                    discount: parseFloat((discount).toFixed(2))
                };
            } else {
                return {
                    status: 'ERROR',
                    message: 'NÃO FOI POSSÍVEL APLICAR O DESCONTO. QUANTIDADE DE ITENS NÃO É SUFICIENTE PARA APLICAR O CUPOM'
                }
            }

        default:
            //Retorna erro se o cupom aplicado não for válido.
            return {
                status: 'ERROR',
                message: 'NÃO FOI POSSÍVEL APLICAR O DESCONTO. CUPOM INVÁLIDO'
            }
    }

}

//Função que calcula o valor do carrinho se não tiver cupom
async function sumCart(products) {
    let total = 0;
    let freight = 0;
    let discount = 0;

    for (let product of products) {
        let prod = await cart.getProduct(product)

        //Checa se o produto tem quantidade disponível no estoque
        if (prod[0].quantidade < product.quantity || product.quantity <= 0) {
            return {
                status: 'ERROR',
                message: `QUANTIDADE SOLICITADA DO ITEM ${prod[0].nome} ESTÁ INDISPONÍVEL NO ESTOQUE`
            }
        }

        total += prod[0].preco * product.quantity;
        freight += 17.9 * product.quantity * (prod[0].peso / 1000)
    }
    return {
        status: 'SUCCESS',
        total: parseFloat((total + freight).toFixed(2)),
        totaldisc: parseFloat((total + freight).toFixed(2)),
        discount: parseFloat((discount).toFixed(2))
    };
}




//Função que efetua a compra dos itens no carrinho
async function checkout(req, res, next) {
    try {
        let purchase = req.body;
        let result;

        //Checa se existe cupom e se ele não é vazio
        if (purchase.coupon && purchase.coupon != "") {
            result = await computeCart(purchase.coupon, purchase.cart)
        } else {
            result = await sumCart(purchase.cart)
        }

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

module.exports.checkout = checkout;


//Função que busca produtos no banco
async function getProduct(req, res, next) {
    try {
        let context = {}
        context.productId = req.params.id
        const rows = await cart.getProduct(context)

        res.status(200).json(rows);

    } catch (err) {
        next(err);
    }
}

module.exports.getProduct = getProduct;


