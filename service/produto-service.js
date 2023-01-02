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



