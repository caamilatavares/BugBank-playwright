import { test } from '../../fixtures/testSetup'
import { parseCurrencyToNumber } from '../../utils/balanceUtils'

test.describe('Transfer feature', { tag: '@transfers' }, async () => {
  test.beforeEach('Should do login successfully', async ({ url }) => {
    await url.visitHome()
  })

  test('Should do transfers successfully', async ({ transfer, extract }) => {
    const transferValue = process.env.TRANSFER_VALUE!
    const transferAccountNumber = process.env.TRANSFER_ACCOUNT_NUMBER ?? ''

    const initialBalance = await transfer.getLastBalance()

    const initialBalanceNumber = await parseCurrencyToNumber(initialBalance)

    await transfer.doTransfers(transferValue, transferAccountNumber)
    await transfer.validateTransfer()
    await transfer.backToMenu()

    await extract.visit()
    await extract.validatingExtract(initialBalanceNumber, Number(transferValue))
  })

})

