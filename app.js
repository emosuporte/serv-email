// Importa as bibliotecas necessárias
const express = require('express');
const nodemailer = require('nodemailer');

// Cria o objeto da aplicação Express
const app = express();

// Define a porta em que o servidor irá rodar
const PORT = 3000;

// Configura a aplicação Express para aceitar requisições com corpo JSON
app.use(express.json());

// Define a rota para enviar e-mails
app.post('/enviar-email', (req, res) => {
  // Extrai as informações da requisição
  const remetente = req.body.remetente;
  const senha = req.body.senha;
  const destinatario = req.body.destinatario;
  const assunto = req.body.assunto;
  const corpo = req.body.corpo;

  // Cria o objeto para enviar e-mails com o Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: remetente,
      pass: senha,
    },
  });

  // Cria a mensagem a ser enviada
  const mensagem = {
    from: remetente,
    to: destinatario,
    subject: assunto,
    text: corpo,
  };

  // Envia a mensagem
  transporter.sendMail(mensagem, (erro, info) => {
    if (erro) {
      console.log(erro);
      res.status(500).send('Erro ao enviar e-mail');
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.status(200).send('E-mail enviado com sucesso');
    }
  });
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
