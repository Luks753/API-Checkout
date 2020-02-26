# APISHOP - Checkout 

API simples para calcular valores de um carrinho de compras e aplicar cupons de desconto implementada em NodeJS

Cupons de desconto:

FRETEGRATIS: Frete grátis para qualquer produto.
FRETEGRATISNB: Frete grátis apenas para notebooks.
BONUSMIN: Frete grátis para qualquer produto caso o carrinho tenha um valor acima de R$ 300,00.
FRETE15OFF: Frete grátis para qualquer produto da loja + 15% de desconto no valor do produto promocional.
3POR2: Adicionando quaisquer 3 produtos iguais, o 3o não será cobrado.
3POR2HARDWARE: Adicionando 3 produtos de Hardware, o produto com o menor valor não será cobrado.

Produto promocional do cupom FRETE15OFF é o com ID igual a 1

Resquest/Response:

[POST] /cart/simulate --> { cart: [ { productId: number, quantity: number } ], coupon: 'MEU_CUPOM' }

Em caso de sucesso: <-- { status: "SUCCESS", total_value: number, // Valor total do carrinho sem os descontos final_value: number, // Valor após aplicado os descontos, discount_value: number // Valor dos descontos. }

Em caso de erro: <-- { status: 'ERROR', message: string // Mensagem com a descrição do erro }

Endpoints:

[POST] http://localhost:8080/api/cart/simulate //Efetua a compra
[GET]  http://localhost:8080/api/produtos/:id? //Busca os produtos ou um produto específico no banco
