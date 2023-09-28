import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const TITLE_SUBJECT_EMAIL = `Orçamento via: ${process.env.NEXT_PUBLIC_APP_NAME}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, email, contact } = req.body;

      const email_content = `
      <b>Atenção: Este email foi automaticamente recebido através da sua página web.</b>

      <p>Olá, preciso de um orçamento.</p>
      <p><b>Nome: </b> ${name}</p>
      <p><b>E-mail: </b> ${email}</p>
      <p><b>Contato: </b> ${contact}</p>
       `;

      // Configurar o transporte de e-mail
      const transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Definir informações do e-mail
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: TITLE_SUBJECT_EMAIL,
        html: email_content,
      };

      // Enviar o e-mail
      await transporter.sendMail(mailOptions);

      res.status(204).end();
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      res.status(500).json({ error: { default: 'Ocorreu um erro ao enviar o e-mail.' } });
    }
  } else {
    res.status(405).json({ error: { default: 'Método não permitido.' } });
  }
};
