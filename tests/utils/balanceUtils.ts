export function calculateBalanceAfterTransfer(
  initialValue: number,
  transferValue: number
): number {
  const endValue = initialValue - transferValue
  return endValue
}

export function parseCurrencyToNumber(value: string): number {
    return Number(
        value
        .replace('R$', '')
        .trim()
        .replace(/\./g, '')
        .replace(',', '.')
    )
}

type AccountData = {
  account: string
  digit: string
}

export function splitAccountNumber(accountNumber: string): AccountData {
  const [account, digit] = accountNumber.split('-')

  return {
    account,
    digit
  }
}
