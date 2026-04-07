import { test } from '../../fixtures/testSetup'
import { createUser } from '../../factories/user.factory'

test.describe('Register Feature', { tag: '@register' }, async () => {
  test('Should register successfuly', async ({ register }) => {
    const user = createUser()

    await register.visit()
    await register.fillRegistrationForm(user.email, user.name, user.password)
    await register.sendRegistrationForm()
    await register.validateRegistration()
  })
})
