import { expect, Page } from '@playwright/test'
import { calculateBalanceAfterTransfer } from '../../utils/balanceUtils'
import { Transfer } from '../actions/Transfer'

export class Extract extends Transfer {
    constructor(readonly page: Page){ 
        super(page)
    }

    async visit(){
        await this.page.locator('#btn-EXTRATO').click()
    }

    async validatingExtract(initialValue: number, transferValue: number): Promise<void>{
        const valueInAccount = await calculateBalanceAfterTransfer(initialValue, transferValue)
        await expect(
            this.page.locator('#textBalanceAvailable')
        ).toContainText(`R$ ${valueInAccount},00`) 
    }
}