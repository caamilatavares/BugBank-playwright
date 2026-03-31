import { test } from '../../fixtures/testSetup'
import { createUser } from '../../factories/user.factory'

test.describe('Login feature', { tag: '@login' }, async () => {
  test('Should do login successfully', async ({ login }) => {
    const user = createUser()
    
    await login.visit()
    await login.fillLoginForm(user.email, user.password)
    await login.doLogin()
    await login.validateLogin(user.name)
    await login.validateAccountNumber(user.accountNumber)
  })

  test('Should not do login without filling the mandatory fields', async ({ login, warning }) => {
    const mandatoryFieldsWarnings = [
      'É campo obrigatório',
      'É campo obrigatório'
    ]
    await login.visit()
    await login.doLogin()
    await warning.verifyWarningText(mandatoryFieldsWarnings)
  })

  test('Should not do login with wrong credentials', async ({ login, modal }) => {
    const user = createUser({
      email: 'fakeemail@test.com',
      password: '1234'
    })

    await login.visit()
    await login.fillLoginForm(user.email, user.password)
    await login.doLogin()

    const errorText = await modal.getModalText()
    await login.validateLoginError(errorText)
  })
})
