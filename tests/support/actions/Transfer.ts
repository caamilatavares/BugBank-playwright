import { Page, expect } from '@playwright/test'

import { splitAccountNumber } from '../../utils/balanceUtils'
import { Modal } from '../actions/Components'

export class Transfer extends Modal {
    constructor(readonly page: Page){ 
        super(page)
    }

    async doTransfers(transferValue: string, accountNumber: string){
        await this.page.locator('#btn-TRANSFERÊNCIA')
            .click()
        
        const accountNumberArray = await splitAccountNumber(accountNumber)

        await this.page.locator('input[name=accountNumber]').fill(accountNumberArray.account)
        await this.page.locator('input[name=digit]').fill(accountNumberArray.digit)
        await this.page.locator('input[name=transferValue]').fill(transferValue)
        await this.page.locator('input[name=description]').fill('Test Transfer')
        await this.page.getByText('Transferir agora').click()
    }

    async validateTransfer(): Promise<void>{
        const modalText = await this.getModalText()
        await expect(modalText).toMatch('Transferencia realizada com sucesso')
        await this.closeModal()
    }

    async getLastBalance(): Promise<string>{
        const lastBalance = '#textBalance span'

        const balanceValue = await this.page.locator(lastBalance)
            .textContent()
        return balanceValue ?? ''
    }

    async backToMenu(): Promise<void>{
        await this.page.locator('#btnBack').click()
    }
}