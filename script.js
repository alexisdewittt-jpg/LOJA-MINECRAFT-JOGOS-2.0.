const numeroWhatsApp = "555596459315";

// Pacotes disponíveis
const pacotes = [
    100, 250, 500, 750, 1000,
    1500, 2000, 3000, 5000, 10000
];

// Elementos
const nome = document.getElementById("nome");
const nick = document.getElementById("nick");
const pacote = document.getElementById("pacote");
const status = document.getElementById("status");
const cards = document.getElementById("cards");
const hist = document.getElementById("hist");
const btnPedido = document.getElementById("btnPedido");
const btnLimpar = document.getElementById("btnLimpar");

// Criar opções e cartões
pacotes.forEach(valor => {

    const option = document.createElement("option");
    option.value = `${valor} Diamantes`;
    option.textContent = `${valor} Diamantes`;
    pacote.appendChild(option);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h2>${valor}</h2>
        <p>Diamantes</p>
        <button>Selecionar</button>
    `;

    card.querySelector("button").onclick = () => {
        pacote.value = option.value;
        status.textContent = option.value;
    };

    cards.appendChild(card);

});

status.textContent = pacote.value;

pacote.onchange = () => {
    status.textContent = pacote.value;
};

// Atualiza histórico
function render() {

    hist.innerHTML = "";

    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");

    pedidos.forEach(p => {

        const li = document.createElement("li");
        li.textContent = `${p.nome} | ${p.nick} | ${p.id} | ${p.pacote}`;
        hist.appendChild(li);

    });

}

render();

// Botão WhatsApp
btnPedido.onclick = () => {

    if (
        nome.value.trim() === "" ||
        nick.value.trim() === "" ||
        idj.value.trim() === ""
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    const pedido = {
        nome: nome.value,
        nick: nick.value,
        id: idj.value,
        pacote: pacote.value
    };

    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    render();

    const mensagem =
`Olá!

Nome: ${pedido.nome}
Nick: ${pedido.nick}
Pacote: ${pedido.pacote}`;

    const url =
`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // Tenta abrir o WhatsApp
    window.open(url, "_blank");
};

// Limpar histórico
btnLimpar.onclick = () => {

    if (confirm("Deseja limpar o histórico?")) {
        localStorage.removeItem("pedidos");
        render();
    }

};
