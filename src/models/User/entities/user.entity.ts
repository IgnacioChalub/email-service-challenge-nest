import { DailyEmails } from "@models/DailyEmails/entities";

export class User {
    id: string;
    username: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    dailyEmails?: DailyEmails[]
}