import { User } from "@models/User/entities"

export class DailyEmails {
    id: string
    date: Date
    amount: number
    user: User
}