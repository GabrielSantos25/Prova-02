const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Banco de dados em memória
var clientes = [];

app.get('/listar', (request, response) => {
    response.json(clientes);
});

// Cadastrar clientes
app.post("/cadastrar", (request, response) => {
    let cliente = request.body;
    clientes.push(cliente); // Adiciona o cliente no banco de dados em memória
    response.json({ success: true });
});

// Excluir cliente pelo CPF
app.delete("/excluir/:cpf", (request, response) => {
    let cpf = request.params.cpf;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cpf == cpf) {
            clientes.splice(i, 1); // Remove o elemento encontrado na posição "i"
            break;
        }
    }
    response.json({ success: true });
});

// Alterar cliente
app.put("/alterar", (request, response) => {
    let cliente = request.body;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cpf == cliente.cpf) {
            clientes[i] = cliente; // Substitui os dados do cliente pelos dados enviados pelo front
            break;
        }
    }
    response.json({ success: true });
});

app.get('/buscar', (req, res) => {
    const termo = req.query.termo;
    
    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(termo.toLowerCase())
    );
    res.json(clientesFiltrados);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});