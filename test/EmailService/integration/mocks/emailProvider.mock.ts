import { IEmailProvider } from "@EmailService/repository";

export class MockEmailProvider implements IEmailProvider {
    
    sendEmail(from: string, to: string, subject: string, text: string): Promise<boolean> {
        return Promise.resolve(true);
    }
    
}