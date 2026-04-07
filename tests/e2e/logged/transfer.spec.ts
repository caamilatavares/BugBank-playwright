import { test } from '../../fixtures/testSetup'
import { parseCurrencyToNumber } from '../../utils/balanceUtils'

const transferValue = process.env.TRANSFER_VALUE!

test.describe('Transfer feature', { tag: '@transfers' }, async () => {
  test.beforeEach('Should do login successfully', async ({ url }) => {
    await url.visitHome()
  })

  test('Should do transfers successfully', async ({ transfer, extract }) => {
    const message = 'Transferencia realizada com sucesso'
    const transferAccountNumber = process.env.TRANSFER_ACCOUNT_NUMBER ?? ''

    const initialBalance = await transfer.getLastBalance()
    const initialBalanceNumber = await parseCurrencyToNumber(initialBalance)

    await transfer.doTransfers(transferValue, transferAccountNumber)
    await transfer.validateTransfer(message)
    await transfer.backToMenu()

    await extract.visit()
    await extract.validatingExtract(initialBalanceNumber, Number(transferValue))
  })

  test('Should not do transfers to its own account', async ({ transfer, extract }) => {
    const accountNumber = process.env.ACCOUNT_NUMBER!
    const message = 'Nao pode transferir pra mesmo conta'

    const initialBalance = await transfer.getLastBalance()
    const initialBalanceNumber = await parseCurrencyToNumber(initialBalance)

    await transfer.doTransfers(transferValue, accountNumber)
    await transfer.validateTransfer(message)

    await extract.validatingExtract(initialBalanceNumber, 0)
  })

  test('Should not do transfers to an inexistent account', async ({ transfer, extract }) => {
    const accountNumber = '000-0'
    const message = 'Conta inválida ou inexistente'

    const initialBalance = await transfer.getLastBalance()
    const initialBalanceNumber = await parseCurrencyToNumber(initialBalance)

    await transfer.doTransfers(transferValue, accountNumber)
    await transfer.validateTransfer(message)
    await transfer.backToMenu()

    await extract.visit()
    await extract.validatingExtract(initialBalanceNumber, 0)
  })
})

