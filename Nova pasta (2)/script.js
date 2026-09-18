let produtos = [
    { id: 1, nome: "Sabonete Íntimo Suave", descricao: "Limpeza delicada, mantém o equilíbrio da sua região íntima. pH balanceado.", preco: 24.90, quantidade: 1 },
    { id: 2, nome: "Hidratante Facial", descricao: "Hidrata, protege e deixa sua pele com um toque macio e saudável.", preco: 39.90, quantidade: 1 },
    { id: 3, nome: "Body Splash", descricao: "Fragrância leve e envolvente para te acompanhar o dia todo.", preco: 29.90, quantidade: 1 },
    { id: 4, nome: "Shampoo Hidratante", descricao: "Limpeza suave e devolve o brilho natural dos fios.", preco: 32.90, quantidade: 1 },
    { id: 5, nome: "Aparelho Depilatório", descricao: "Corte preciso e seguro para uma pele lisa e livre de irritações.", preco: 19.90, quantidade: 1 }
];

let descontoAtivoPorcentagem = 0;
let cupomAplicadoNome = "";

function renderizarCarrinho() {
    const container = document.getElementById('lista-produtos-carrinho');
    if (!container) return; 
    
    container.innerHTML = "";

    if (produtos.length === 0) {
        container.innerHTML = "<p style='padding: 40px 0; text-align: center; color: var(--cicly-text-light);'>Seu carrinho está vazio.</p>";
        atualizarResumo(0, 0);
        return;
    }

    let subtotalGeral = 0;
    let totalItens = 0;

    produtos.forEach(prod => {
        let subtotalItem = prod.preco * prod.quantidade;
        subtotalGeral += subtotalItem;
        totalItens += prod.quantidade;

        const itemHTML = `
            <div class="produto-item">
                <div class="produto-info">
                    <div class="produto-img-wrapper">
                        <div class="placeholder-prod"></div>
                    </div>
                    <div class="produto-detalhes">
                        <h3>${prod.nome}</h3>
                        <p>${prod.descricao}</p>
                        <div class="produto-preco-unitario">R$ ${prod.preco.toFixed(2).replace('.', ',')}</div>
                    </div>
                </div>
                <div class="qtd-container">
                    <div class="qtd-box">
                        <button class="qtd-btn" onclick="alterarQtd(${prod.id}, -1)">−</button>
                        <div class="qtd-num">${prod.quantidade}</div>
                        <button class="qtd-btn" onclick="alterarQtd(${prod.id}, 1)">+</button>
                    </div>
                </div>
                <div class="preco-subtotal-container">
                    <div class="preco-total-item">R$ ${subtotalItem.toFixed(2).replace('.', ',')}</div>
                    <button class="btn-remover" onclick="removerItem(${prod.id})" title="Remover produto">🗑</button>
                </div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });

    atualizarResumo(subtotalGeral, totalItens);
}

function alterarQtd(id, valor) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto.quantidade += valor;
        if (produto.quantidade < 1) produto.quantidade = 1;
        renderizarCarrinho();
    }
}

function removerItem(id) {
    produtos = produtos.filter(p => p.id !== id);
    renderizarCarrinho();
}

function limparCarrinho() {
    produtos = [];
    descontoAtivoPorcentagem = 0;
    cupomAplicadoNome = "";
    renderizarCarrinho();
}

/* LÓGICA DO CUPOM - OCULTA O CAMPO APÓS O SUCESSO */
function mostrarCampoCupom() {
    document.getElementById('gatilho-cupom').style.display = 'none';
    document.getElementById('campo-cupom-input').style.display = 'block';
}

function aplicarCupomDesconto() {
    const codigoInput = document.getElementById('input-codigo-cupom').value.trim().toUpperCase();
    const mensagem = document.getElementById('mensagem-cupom');

    if (codigoInput === "CICLY10") {
        descontoAtivoPorcentagem = 0.10; 
        cupomAplicadoNome = "CICLY10";
        
        // Esconde o campo de digitação e volta a exibir o gatilho inicial estilizado
        document.getElementById('campo-cupom-input').style.display = 'none';
        const gatilhoBox = document.getElementById('gatilho-cupom');
        gatilhoBox.style.display = 'flex';
        
        // Modifica o texto do gatilho para mostrar o sucesso de forma elegante
        gatilhoBox.style.borderColor = "#4CAF50";
        gatilhoBox.querySelector('.cupom-text h4').style.color = "#4CAF50";
        gatilhoBox.querySelector('.cupom-text h4').innerText = "Cupom CICLY10 aplicado!";
        gatilhoBox.querySelector('.cupom-text span').innerText = "10% de desconto garantido";
        gatilhoBox.onclick = null; // Desativa o clique para não reabrir
        
        renderizarCarrinho(); 
    } else {
        mensagem.style.color = "#E95280";
        mensagem.innerText = "Cupom inválido. Tente novamente.";
    }
}

function atualizarResumo(subtotal, totalItens) {
    let valorDescontoCalculado = subtotal * descontoAtivoPorcentagem;
    let precoFinalGeral = subtotal - valorDescontoCalculado;

    const linhaDesconto = document.getElementById('linha-desconto');
    if (linhaDesconto) {
        if (valorDescontoCalculado > 0) {
            linhaDesconto.style.display = 'flex';
            document.getElementById('nome-cupom-aplicado').innerText = cupomAplicadoNome;
            document.getElementById('valor-desconto').innerText = `- R$ ${valorDescontoCalculado.toFixed(2).replace('.', ',')}`;
        } else {
            linhaDesconto.style.display = 'none';
        }
    }

    const totalTexto = `R$ ${precoFinalGeral.toFixed(2).replace('.', ',')}`;

    document.getElementById('resumo-qtd-itens').innerText = totalItens;
    document.getElementById('nav-cart-count').innerText = totalItens;
    document.getElementById('resumo-subtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('resumo-total').innerText = totalTexto;

    localStorage.setItem('cicly_total_carrinho', totalTexto);
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();

    const btnFinalizar = document.querySelector('.btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', function() {
            if (produtos.length === 0) {
                alert("Seu carrinho está vazio! Adicione itens antes de finalizar.");
                return;
            }
            this.classList.add('carregando');
            this.innerText = "Processando pedido...";
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1200);
        });
    }
});