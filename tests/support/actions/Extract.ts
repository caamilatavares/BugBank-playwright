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
        let valueInAccount = await calculateBalanceAfterTransfer(initialValue, transferValue)
        let balance = ''

        if(valueInAccount >  999) {
            balance = valueInAccount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        } else {
            balance = valueInAccount.toString()
        }   
        
        await expect(this.page.locator('#textBalanceAvailable'))
            .toContainText(`R$ ${balance},00`)
    }
}