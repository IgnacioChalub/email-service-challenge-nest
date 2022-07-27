export abstract class IEmailProvider {
    abstract sendEmail(from: string, to: string, subject: string, text: string): Promise<boolean>;
}