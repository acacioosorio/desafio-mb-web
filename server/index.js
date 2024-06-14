const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors({
	origin: ['http://localhost:8080', 'http://localhost:3000']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/registration', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.post('/registration', (req, res) => {
	const { email, type, legalPerson, jurisdicPerson, password } = req.body;

	if (!email || !password) return res.status(400).json({ error: 'Email e Senha são obrigatórios' });

	if (type === 'pessoaFisica') {
		const { name, cpf, birthday, phone } = legalPerson;
		if (!name || !cpf || !birthday || !phone) return res.status(400).json({ error: 'Todos os campos para Pessoa Física precisam ser preenchidos' });

	} else if (type === 'pessoaJuridica') {
		const { name, cnpj, openingDate, phone } = jurisdicPerson;
		if (!name || !cnpj || !openingDate || !phone) return res.status(400).json({ error: 'Todos os campos para Pessoa Jurídica precisam ser preenchidos' });

	} else return res.status(400).json({ error: 'Tipo de Pessoa não selecionado. Deve ser Pessoa Física ou Pessoa Jurídica' });

	res.status(200).json({ message: 'Registro concluido com sucesso' });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
