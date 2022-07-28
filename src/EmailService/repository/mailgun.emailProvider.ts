import { IEmailProvider } from "./emailProvider.interface";
require('dotenv').config()
const mailgun = require("mailgun-js");

export class MailgunEmailProvider implements IEmailProvider {
    
    async sendEmail(from: string, to: string, subject: string, text: string): Promise<boolean> {
        const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
        const data = {
        	from: process.env.EMAIL,
        	to: to,
        	subject: subject,
        	text: 'email sent from ' + from + ' \n' + text
        };
        return mg.messages().send(data).then((body: any) => {
            return true
        }).catch((error: any) => {
            return false
        })  
    }
}