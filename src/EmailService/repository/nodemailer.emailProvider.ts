import { IEmailProvider } from "./emailProvider.interface";
require('dotenv').config()
var nodemailer = require('nodemailer');


export class NodemailerEmailProvider implements IEmailProvider {
    
    async sendEmail(from: string, to: string, subject: string, text: string): Promise<boolean> {
      const email = process.env.EMAIL;
      const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE,
          auth: {
            user: email,
            pass: process.env.EMAIL_PASSWORD,
          }
        });
      var mailOptions = {
          from: email,
          to: to,
          subject: subject,
          text: 'email sent from ' + from + ' \n' + text
        };
      return await transporter.sendMail(mailOptions).then((info: any) => {
            return true
        }).catch((error: any) => {
            return false
        }) 

    }
    
}