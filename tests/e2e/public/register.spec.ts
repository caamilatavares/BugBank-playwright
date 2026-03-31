import { test } from '../../fixtures/testSetup'

type User = {
  email: string
  password: string
  name: string
}

const user: User = {
  email: 'registertest@test.com',
  password: process.env.PASSWORD!,
  name: 'Test register'
}

test('Should register successfuly', async ({ modal, register }) => {
  await register.doRegistration(user.email, user.name, user.password)
})