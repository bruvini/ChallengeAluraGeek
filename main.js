/** AQUI FICARÃO AS CHAMADAS DOS CÓDIGOS JAVASCRIPT*/

/**Função para criar um produto na página inicial */
const criaProdutoIndex = (url, nome, preco, categoria) => {
    /** crio uma constante que gera um elemento do tipo div já com a classe produto */
    const linhaNovoProduto = document.createElement('div.produto')

    /** adiciono na constante conteudo o bloco de produto que eu quero */
    const conteudo =
        `
    <img src="${url}" alt="" class="produto_imagem">
    <div class="produto_infos" data-cat="${categoria}">
        <h2 class="produto_titulo">${nome}</h2>
        <h2 class="produto_preco">R$${preco}</h2>
        <a href="#" class="produto_link">Ver produto</a>
    </div>
    `

    /** informo que a div.produto vai receber todo aquele bloco de código */
    linhaNovoProduto.innerHTML = conteudo

    /** retorno essa variável completa */
    return linhaNovoProduto
}

const itensConsole = document.querySelector('[data-console]')
const itensStarWars = document.querySelector('[data-starwars]')
const itensDiversos = document.querySelector('[data-diversos]')
const todosItens = document.querySelector('[data-listaProdutos]')

const listaProdutos = async () => {
    return await fetch(`http://localhost:3000/produtos`)
        .then(resposta => {
            return resposta.json()
        })
}

listaProdutos()
    .then(data => {
        data.forEach(elemento => {
            if (elemento.categoria == "C" && document.querySelectorAll('[data-cat="C"]').length < 6) {
                itensConsole.appendChild(criaProdutoIndex(elemento.url, elemento.nome, elemento.preco, elemento.categoria))
            } else if (elemento.categoria === "D" && document.querySelectorAll('[data-cat="D"]').length < 6) {
                itensDiversos.appendChild(criaProdutoIndex(elemento.url, elemento.nome, elemento.preco, elemento.categoria))
            } else if (elemento.categoria == "S" && document.querySelectorAll('[data-cat="S"]').length < 6) {
                itensStarWars.appendChild(criaProdutoIndex(elemento.url, elemento.nome, elemento.preco, elemento.categoria))
            } else {
                todosItens.appendChild(criaProdutoIndex(elemento.nome, elemento.preco))
            }

        })
    })

/**CADASTRA UM NOVO PRODUTO */
/**Armazena as informações do formulário */
const formularioCadastro = document.querySelector('[data-formulario]')
formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const url = evento.target.querySelector('[data-url]').value
    const cat = evento.target.querySelector('[data-categoria]').value
    const nome = evento.target.querySelector('[data-nome]').value
    const preco = evento.target.querySelector('[data-preco]').value
    const descricao = evento.target.querySelector('[data-descricao]').value

    /**Adiciona as informações armazenadas no arquivo db.json */
    const adicionaProduto = async (url, cat, nome, preco, descricao) => {
        return await fetch(`http://localhost:3000/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                preco: preco,
                descricao: descricao,
                categoria: cat,
                url: url
            })
        })
            .then(resposta => {
                return resposta.body
            })
    }

    /**Chama a função e direciona para a página de produtos gerais */
    adicionaProduto(url, cat, nome, preco, descricao)
        .then(() => {
            window.location.href = 'editarProdutos.html'
        })
})