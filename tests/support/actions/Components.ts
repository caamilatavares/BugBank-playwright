import { Page, expect } from '@playwright/test'

export class Modal {
    constructor(readonly page: Page) {
        this.page = page
    }

    private modalText = '#modalText'
    private buttonClose = '#btnCloseModal'

    async getModalText(): Promise<string> {
        const textModal = await this.page.locator(this.modalText).textContent()
        
        if (!textModal) {
            throw new Error("Can't find text")
        } else {
            return textModal
        }
    }

    async closeModal(): Promise<void> {
        const modalText = this.page.locator(this.modalText)

        await this.page.locator(this.buttonClose)
            .click()
            
        await expect(modalText).toBeHidden()
    }
}

export class Warning {
    constructor(readonly page: Page){
        this.page = page
    }

    async verifyWarningText(text: string[]): Promise<void> {
        await expect(this.page.locator(
            '.card__login .input__child .input__warging'
        )).toContainText(text)
    }
}

export class Url {
    constructor(readonly page: Page){
        this.page = page
    }

    async visitHome(): Promise<void>{
        await this.page.goto('/home')
    }
}