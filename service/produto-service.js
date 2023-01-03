const http = new XMLHttpRequest()
const blocoProdutoDiversos = document.querySelector('[data-diversos]')
const blocoProdutoConsole = document.querySelector('[data-console]')
const blocoProdutoStarWars = document.querySelector('[data-starwars]')
const blocoProdutoGeral = document.querySelector('[data-listaProdutos]')

const criaProduto = (nome, preco) => {
    const novoProduto = document.createElement('div.produto')
    const conteudo =
        `
        <div class="imagem">
        <span class="icones_acao">
            <a href=""><img src="/img/excluir.png" alt="" class="produto_acao lixeira"></a>
            <a href=""><img src="/img/editar.png" alt="" class="produto_acao"></a>
        </span>
    </div>
    <div class="produto_infos">
        <h2 class="produto_titulo">${nome}</h2>
        <h2 class="produto_preco">R$${preco}</h2>
        <h2 href="" class="produto_cod">s/ código</h2>
    </div>
    `
    novoProduto.innerHTML = conteudo
    return novoProduto
}

http.open('GET', 'http://localhost:3000/produtos')
http.send()
http.onload = () => {
    const data = JSON.parse(http.response)
    data.forEach(item => {
        blocoProdutoGeral.appendChild(criaProduto(item.nome,item.preco))
    });
}

const addProduto = (url, categoria, nome, preco, descricao) => {
    return fetch('http://localhost:3000/produtos', {
        method: 'POST', 
        headers: {
            'Content-type' : 'application/json'
        }, body: JSON.stringify({
            url: url,
            categoria: categoria,
            nome: nome,
            preco: preco,
            descricao: descricao
        })
    })
    .then(resposta => {
        return resposta.body
    })
}

const formulario = document.querySelector('[data-formulario]')
console.log(formulario)
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const urlProd = evento.target.querySelector('[data-url]').value
    const catProd = evento.target.querySelector('[data-categoria]').value
    const nomeProd = evento.target.querySelector('[data-nome]').value
    const precoProd = evento.target.querySelector('[data-preco]').value
    const descricaoProd = evento.target.querySelector('[data-descricao]').value

    addProduto(urlProd, catProd, nomeProd, precoProd, descricaoProd)
    .then(() => {
        window.location.href = "./editarProdutos.html"
    })
})



