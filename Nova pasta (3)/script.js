document.addEventListener('DOMContentLoaded', () => {

    // 1. Controle do Carrinho de Compras
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartBadge.textContent = cartCount;
            
            // Animação simples no botão
            button.style.backgroundColor = '#4caf50';
            button.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado!';
            
            setTimeout(() => {
                button.style.backgroundColor = '';
                button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Adicionar ao carrinho';
            }, 1200);
        });
    });

    // 2. Favoritar Produtos (Troca de ícone de coração)
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });
    });

    // 3. Submissão do Formulário de Newsletter
    const newsForm = document.getElementById('newsForm');
    newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado por se inscrever na Cicly! Em breve você receberá nossas ofertas.');
        newsForm.reset();
    });

    // 4. Botão de Voltar ao Topo
    const backToTopBtn = document.getElementById('backToTop');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});