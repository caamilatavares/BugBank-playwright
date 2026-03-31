import { Page, expect } from '@playwright/test'
import { Modal } from '../actions/Components'

export class Register extends Modal {
    constructor(readonly page: Page) {
        super(page)
    }

    async visit(): Promise<void> {
        await this.page.goto('/')
        await this.page.getByText('Registrar')
            .click()
    }

    async fillRegistrationForm(
        email: string,
        name: string,
        password: string): Promise<void> {
        await this.page.locator('.card__register')
            .getByPlaceholder('Informe seu e-mail')
            .fill(email)
        await this.page.locator('.card__register')
            .getByPlaceholder('Informe seu Nome')
            .fill(name)
        await this.page.locator('.card__register')
            .getByPlaceholder('Informe sua senha')
            .fill(password)
        await this.page.locator('.card__register')
            .getByPlaceholder('Informe a confirmação da senha')
            .fill(password)
    }

    async sendRegistrationForm() {
        await this.page.getByText('Cadastrar')
            .click()
    }

    async addBalance() {
        await this.page.locator('#toggleAddBalance')
            .click()
    }

    async getAccountNumber(): Promise<string> {
        const textAccount = await this.getModalText()
        const match = textAccount.match(/\d+-\d+/)

        if (!match) {
            throw new Error("Account number not found")
        }

        const accountNumber = match[0]

        return accountNumber
    }

    async validateRegistration(): Promise<void> {
        const registrationText = await this.getModalText()
        await expect(registrationText).toContain('foi criada com sucesso')
    }

    async doRegistration(
        email: string,
        name: string,
        password: string
    ):Promise<string> {
        await this.visit()
        await this.fillRegistrationForm(email, name, password)
        await this.addBalance()
        await this.sendRegistrationForm()
        const accountNumber = await this.getAccountNumber()
        await this.closeModal()
        
        return accountNumber
    }
}