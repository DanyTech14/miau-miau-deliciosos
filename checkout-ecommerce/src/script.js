document.addEventListener('DOMContentLoaded', () => {
    // Carrinho inicial com três produtos de exemplo
    let cart = [
        {
            nome: "Camiseta Angola",
            ref: "A001",
            preco: 5000,
            imagem: "https://placehold.co/38x38?text=C1",
            quantidade: 2
        },
        {
            nome: "Boné Luanda",
            ref: "B002",
            preco: 3500,
            imagem: "https://placehold.co/38x38?text=B2",
            quantidade: 1
        },
        {
            nome: "Caneca Maputo",
            ref: "C003",
            preco: 2500,
            imagem: "https://placehold.co/38x38?text=C3",
            quantidade: 3
        }
    ];

    // Renderiza o carrinho na lateral
    function renderCart() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        let subtotal = 0;
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
        document.querySelector('.summary-totals').innerHTML = `
            <div><span>Subtotal</span><span>${subtotal.toLocaleString('pt-AO')} Kz</span></div>
            <div><span>Entrega</span><span>Grátis</span></div>
            <div class="total"><span>Total</span><span>${subtotal.toLocaleString('pt-AO')} Kz</span></div>
        `;
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
});

