import { Page } from '@playwright/test'
import { Register } from '../actions/Register'
import { createUser } from '../../factories/user.factory'

export class UserTransferRegistration extends Register {
    constructor(readonly page: Page){
        super(page)
    }

    async createUserTransferAccount(): Promise<string> {
        const userTransfer = createUser({
            email: 'transferuser@teste.com',
            password: process.env.PASSWORD!,
            name: 'Transfer user',
        })

        const transferAccountNumber = await this.doRegistration(userTransfer.email, userTransfer.name, userTransfer.password)
        return transferAccountNumber
    }
}