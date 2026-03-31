type User = {
  email: string
  password: string
}

type FullUser = User & {
  name: string
  accountNumber: string
}

export function createUser(overrides?: Partial<FullUser>): FullUser {
  return {
    email: process.env.EMAIL ?? 'default@email.com',
    password: process.env.PASSWORD ?? '123456',
    name: process.env.NAME ?? 'Default User',
    accountNumber: process.env.ACCOUNT_NUMBER ?? '000-0',
    ...overrides
  }
}