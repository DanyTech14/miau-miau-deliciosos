document.addEventListener('DOMContentLoaded', () => {
    // Carrinho inicial com três produtos de exemplo
    let cart = [
        {
            nome: "Camiseta Angola",
            ref: "A001",
            preco: 5000,
            imagem: "https://th.bing.com/th/id/OIP.My-x02eN4lDFqKhNBcL74wHaHa?w=200&h=200&c=7&r=0&o=7&pid=1.7&rm=3",
            quantidade: 4
        },
        {
            nome: "Boné Luanda",
            ref: "B002",
            preco: 3500,
            imagem: "https://th.bing.com/th/id/OIP.U2XStKmc848bDwVYcFhCrgHaIl?w=183&h=212&c=7&r=0&o=7&pid=1.7&rm=3",
            quantidade: 2
        },
        {
            nome: "Caneca Maputo",
            ref: "C003",
            preco: 2500,
            imagem: "https://th.bing.com/th/id/OIP.Dl9GjVD59f0bYNYzlr3zuAHaE6?w=295&h=196&c=7&r=0&o=7&pid=1.7&rm=3",
            quantidade: 2
        }
    ];

    // Renderiza o carrinho na lateral
    function renderCart() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        let subtotal = 0;
        const entrega = 4500; // Valor fixo da entrega

        cart.forEach((item, idx) => {
            subtotal += item.preco * item.quantidade;
            cartList.innerHTML += `
                <div class="summary-item" data-idx="${idx}">
                    <img src="${item.imagem}" alt="">
                    <div>
                        <div class="item-title">${item.nome}</div>
                        <div class="item-ref">Ref.: ${item.ref}</div>
                    </div>
                    <div class="item-price">${(item.preco * item.quantidade).toLocaleString('pt-AO')} Kz</div>
                    <button class="remove-item" title="Remover">&times;</button>
                </div>
            `;
        });

        // Se não houver produtos, não mostra entrega nem total com entrega
        if (cart.length > 0) {
            document.querySelector('.summary-totals').innerHTML = `
                <div><span>Subtotal</span><span>${subtotal.toLocaleString('pt-AO')} Kz</span></div>
                <div><span>Entrega</span><span>${entrega.toLocaleString('pt-AO')} Kz</span></div>
                <div class="total"><span>Total</span><span>${(subtotal + entrega).toLocaleString('pt-AO')} Kz</span></div>
            `;
        } else {
            document.querySelector('.summary-totals').innerHTML = `
                <div><span>Subtotal</span><span>0 Kz</span></div>
                <div><span>Entrega</span><span>0 Kz</span></div>
                <div class="total"><span>Total</span><span>0 Kz</span></div>
            `;
        }
    }

    renderCart();

    // Remover produto do carrinho
    document.getElementById('cart-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const idx = e.target.closest('.summary-item').getAttribute('data-idx');
            cart.splice(idx, 1);
            renderCart();
        }
    });

    // Mostrar dados bancários ao selecionar transferência
    document.getElementById('pagamento').addEventListener('change', function() {
        const dados = document.getElementById('dados-bancarios');
        if (this.value === 'Transferência Bancária') {
            dados.style.display = 'block';
        } else {
            dados.style.display = 'none';
        }
    });

    // Gerar PDF ao finalizar compra
    document.querySelector('.checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const doc = new window.jspdf.jsPDF();
        doc.setFontSize(16);
        doc.text("Confirmação de Pedido", 20, 20);
        doc.setFontSize(12);
        doc.text("Nome: " + document.getElementById('nome').value, 20, 35);
        doc.text("E-mail: " + document.getElementById('email').value, 20, 45);
        doc.text("Telefone: " + document.getElementById('telefone').value, 20, 55);
        doc.text("Endereço: " + document.getElementById('endereco').value, 20, 65);
        doc.text("Cidade: " + document.getElementById('cidade').value, 20, 75);
        doc.text("Província: " + document.getElementById('provincia').value, 20, 85);
        doc.text("Método de Pagamento: " + document.getElementById('pagamento').value, 20, 95);
        doc.text("Resumo do pedido:", 20, 110);

        let y = 120;
        cart.forEach(item => {
            doc.text(`${item.quantidade}x ${item.nome} (${item.ref}) - ${(item.preco * item.quantidade).toLocaleString('pt-AO')} Kz`, 20, y);
            y += 10;
        });

        // Abre o PDF em uma nova aba
        const pdfUrl = doc.output('bloburl');
        window.open(pdfUrl, '_blank');
        alert("Pedido finalizado! PDF aberto em nova aba.");
    });

    // Limpa todos os campos do formulário ao recarregar a página
    const form = document.querySelector('.checkout-form');
    if (form) form.reset();

    function showStep(step) {
        document.querySelectorAll('.checkout-step').forEach((el, idx) => {
            el.style.display = (idx === step) ? '' : 'none';
        });
        document.querySelectorAll('.step-indicator .step').forEach((el, idx) => {
            el.classList.toggle('active', idx === step);
        });
    }

    // Início na etapa 0 (login)
    let currentStep = 0;
    showStep(currentStep);

    // Login -> Entrega
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        currentStep = 1;
        showStep(currentStep);
    });

    // Entrega -> Pagamento
    document.getElementById('delivery-form').addEventListener('submit', function(e) {
        e.preventDefault();
        currentStep = 2;
        showStep(currentStep);
    });
});

