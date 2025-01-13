import nodemailer from 'nodemailer';
import 'dotenv/config';

const GMAIL = process.env.GMAIL || '';
const GMAILUSER = process.env.GMAILUSER || '';

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: GMAILUSER,
    pass: GMAIL,
  },
  // Si hay error con certificados autofirmados desactivar antivirus o usar la siguiente configuración
  // tls: {
  //   rejectUnauthorized: false,
  // }
});

export const sendMail = async ({to, subject, html}) => {
  try {
    let result = await transport.sendMail({
      from: `Enviado por ${GMAILUSER}`,
      to,
      subject,
      html,
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}