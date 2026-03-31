import { Page, expect } from 'playwright/test'

export class Login {
    constructor(readonly page: Page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/')
        await this.page.waitForLoadState('networkidle')
    }

    async fillLoginForm(email: string, password: string): Promise<void> {
        await this.page.locator('.card__login')
            .locator('input[name=email]')
            .fill(email)

        await this.page.locator('.card__login')
            .locator('input[name=password]')
            .fill(password)
    }

    async doLogin() {
        await this.page.getByText('Acessar')
            .click()
    }

    async validateLogin(name: string): Promise<void> {
        await expect(this.page.locator('#textName')).toBeVisible()
        await expect(this.page.locator('#textName')).toHaveText(`Olá ${name},`)
    }

    async validateAccountNumber(accountNumber: string): Promise<void> {
        await expect(this.page.locator('#textAccountNumber')).toBeVisible()
        await expect(this.page.locator('#textAccountNumber')).toContainText(accountNumber)
    }

    async validateLoginError(errorText: string){
        await expect(errorText).toContain('Usuário ou senha inválido.')
    }
}