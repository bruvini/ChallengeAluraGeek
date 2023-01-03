const http = new XMLHttpRequest()
const blocoProdutoDiversos = document.querySelector('[data-diversos]')
const blocoProdutoConsole = document.querySelector('[data-console]')
const blocoProdutoStarWars = document.querySelector('[data-starwars]')

const criaProduto = (url, nome, preco) => {
    const novoProduto = document.createElement('div.produto')
    const conteudo =
        `
    <img src="${url}" alt="" class="produto_imagem">
    <div class="produto_infos">
        <h2 class="produto_titulo">${nome}</h2>
        <h2 class="produto_preco">R$${preco}</h2>
        <a href="" class="produto_link">Ver produto</a>
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
        if (item.categoria === "Diversos") {
            blocoProdutoDiversos.appendChild(criaProduto(item.url, item.nome, item.preco))
        } else if (item.categoria === "Star Wars") {
            blocoProdutoStarWars.appendChild(criaProduto(item.url, item.nome, item.preco))
        } else {
            blocoProdutoConsole.appendChild(criaProduto(item.url, item.nome, item.preco))
        }
    });
}

const addProduto = (url, categoria, nome, preco, descricao) => {
    return fetch('http://localhost:3000/produtos', {
        method: 'POST', 
        headers: {
            'Content-Type' : 'aplication/json'
        }, body: JSON.stringify({
            url: url,
            categoria: categoria,
            id: id,
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
formulario.addEventListener('submit', (evento) => {
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



