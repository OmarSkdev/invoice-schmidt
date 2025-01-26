import {MailtrapClient} from 'mailtrap'

export const emailCliente = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN!});