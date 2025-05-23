// Animations for the Miau Miau Deliciosos website

// Function to fade in elements
function fadeIn(element) {
    element.style.opacity = 0;
    let last = +new Date();
    const tick = function() {
        element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+element.style.opacity < 1) {
            requestAnimationFrame(tick);
        }
    };
    tick();
}

// Function to bounce an element
function bounce(element) {
    element.style.transition = "transform 0.5s";
    element.style.transform = "translateY(-10px)";
    setTimeout(() => {
        element.style.transform = "translateY(0)";
    }, 100);
}

// Function to add hover effect
function addHoverEffect(element) {
    element.addEventListener('mouseover', () => {
        element.style.transform = "scale(1.1)";
    });
    element.addEventListener('mouseout', () => {
        element.style.transform = "scale(1)";
    });
}

// Apply animations on page load
window.onload = () => {
    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    elementsToFadeIn.forEach(element => fadeIn(element));

    const elementsToBounce = document.querySelectorAll('.bounce');
    elementsToBounce.forEach(element => bounce(element));

    const hoverElements = document.querySelectorAll('.hover-effect');
    hoverElements.forEach(element => addHoverEffect(element));
};

// Animação de balançar as orelhinhas ao passar o mouse nos produtos
document.querySelectorAll('.produto, .produto-fofo').forEach(produto => {
    produto.addEventListener('mouseenter', () => {
        const ears = produto.querySelector('.cat-ears');
        if (ears) {
            ears.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(-10deg)' },
                { transform: 'rotate(10deg)' },
                { transform: 'rotate(0deg)' }
            ], {
                duration: 500,
                iterations: 1
            });
        }
    });
});

// já implementado, mas pode ser reforçado:
document.querySelectorAll('.produto, .produto-fofo').forEach(produto => {
    produto.addEventListener('mouseenter', () => {
        produto.classList.add('hovered');
    });
    produto.addEventListener('mouseleave', () => {
        produto.classList.remove('hovered');
    });
});

// Animação de entrada suave para cada produto
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.produto, .produto-fofo').forEach((produto, i) => {
        produto.style.opacity = 0;
        setTimeout(() => {
            produto.style.opacity = 1;
            produto.style.transition = 'opacity 0.7s';
        }, 300 + i * 200);
    });
});

// Modal de detalhes dos produtos
const detalhesProdutos = {
    1: {
        titulo: "Pastel Gatinho",
        descricao: "Pastel crocante com recheio especial (chocolate, doce de leite ou coco), feito com carinho de gato! Perfeito para adoçar seu dia.",
        emoji: "ฅ^•ﻌ•^ฅ"
    },
    2: {
        titulo: "Docinho de Peixinho",
        descricao: "Docinho macio com sabor de peixe (na verdade, é só formato! Temos morango, chocolate e coco). O favorito dos felinos e humanos!",
        emoji: "=＾● ⋏ ●＾="
    },
    3: {
        titulo: "Biscoito Patinha",
        descricao: "Biscoitos crocantes em formato de patinha, nos sabores chocolate, morango e baunilha. Uma fofura irresistível!",
        emoji: "ʕ•ᴥ•ʔ"
    },
    4: {
        titulo: "Cupcake Miau",
        descricao: "Cupcake macio com cobertura rosa, orelhinhas de chocolate e confeitos. Um mimo para qualquer ocasião!",
        emoji: "=＾•ﻌ•＾="
    },
    5: {
        titulo: "Donut Gatinho",
        descricao: "Donut fofinho com confeitos coloridos e carinha de gato. Perfeito para alegrar o seu dia!",
        emoji: "ฅ(=✧ω✧=)ฅ"
    },
    6: {
        titulo: "Macaron Felino",
        descricao: "Macarons delicados em formato de patinha, nos sabores morango, pistache e chocolate. Crocante por fora, macio por dentro!",
        emoji: "(=^-ω-^=)"
    },
    7: {
        titulo: "Cookie Bigodinho",
        descricao: "Cookies amanteigados com gotas de chocolate e decoração de bigodinhos de gato. Para quem ama um docinho e fofura!",
        emoji: "=＾● ⋏ ●＾="
    }
};

// Abrir modal de detalhes
document.querySelectorAll('.btn-detalhes[data-produto]').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.getAttribute('data-produto');
        const modal = document.getElementById('modal-detalhes');
        const info = detalhesProdutos[id];
        if (info) {
            modal.querySelector('.modal-info').innerHTML = `
                <div style="font-size:2.5rem">${info.emoji}</div>
                <h2 style="color:#e75480">${info.titulo}</h2>
                <p style="color:#a14c7e">${info.descricao}</p>
            `;
            modal.style.display = 'flex';
        }
    });
});
document.querySelector('.modal-fechar').onclick = function() {
    document.getElementById('modal-detalhes').style.display = 'none';
};
window.onclick = function(event) {
    const modal = document.getElementById('modal-detalhes');
    if (event.target === modal) modal.style.display = 'none';
};
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        const modal = document.getElementById('modal-detalhes');
        if (modal) modal.style.display = 'none';
    }
});

// Filtro de sabores com informações detalhadas
const produtosPorSabor = {
    chocolate: ['Pastel Gatinho', 'Biscoito Patinha', 'Cookie Bigodinho', 'Macaron Felino'],
    morango: ['Docinho de Peixinho', 'Macaron Felino', 'Cupcake Miau'],
    coco: ['Pastel Gatinho', 'Docinho de Peixinho'],
    'doce-leite': ['Pastel Gatinho', 'Donut Gatinho'],
    pistache: ['Macaron Felino'],
    baunilha: ['Biscoito Patinha']
};

document.querySelectorAll('.btn-sabor').forEach(btn => {
    btn.addEventListener('click', function() {
        const sabor = this.getAttribute('data-sabor');
        let texto = '';
        if (produtosPorSabor[sabor]) {
            texto = `<strong>${sabor.charAt(0).toUpperCase() + sabor.slice(1)}:</strong> <ul style="margin:0.5em 0 0 1em;">` +
                produtosPorSabor[sabor].map(p => `<li>${p}</li>`).join('') +
                '</ul>';
        } else {
            texto = 'Escolha um sabor para descobrir as delícias!';
        }
        document.querySelector('.sabores-info').innerHTML = texto;
    });
});

// Botão voltar ao topo
const btnTopo = document.getElementById('btn-topo');
window.addEventListener('scroll', () => {
    btnTopo.style.display = window.scrollY > 200 ? 'block' : 'none';
});
btnTopo.onclick = () => window.scrollTo({top:0, behavior:'smooth'});

// Botão voltar ao início do main
const btnMain = document.getElementById('btn-main');
if (btnMain) {
    btnMain.onclick = () => {
        // Tenta rolar o main, se existir, senão rola o body
        const main = document.querySelector('main');
        if (main && main.scrollTop > 0) {
            main.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
}

// Atualiza o link da navbar com a seção atual ao rolar a página
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main > section, .produtos-fofos, .sabores-fofa, .sobre-fofa');
    const navLinks = document.querySelectorAll('.nav-fofa a');
    let current = '';
    const scrollPos = window.scrollY + 100; // Compensa a barra fixa

    sections.forEach(section => {
        if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

document.querySelectorAll('.nav-fofa a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Compensa a barra fixa
                behavior: 'smooth'
            });
        }
    });
});