import { test as setup } from '../fixtures/testSetup'
import { createUser } from '../factories/user.factory'

const user = createUser({
  email: process.env.EMAIL!,
  password: process.env.PASSWORD!,
  name: process.env.NAME!,
})

setup('Setup logged sessions', { tag: '@setup'}, async ({
  register,
  userTransferRegistration,
  localStorageData,
  login }) => {
  const accountNumber = await register.doRegistration(user.email, user.name, user.password)
  process.env.ACCOUNT_NUMBER = accountNumber

  const accoutTransferNumber = await userTransferRegistration.createUserTransferAccount()
  process.env.TRANSFER_ACCOUNT_NUMBER = accoutTransferNumber

  await login.fillLoginForm(user.email, user.password)
  await login.doLogin()
  await login.validateLogin(user.name)

  await localStorageData.saveStorageState()
})