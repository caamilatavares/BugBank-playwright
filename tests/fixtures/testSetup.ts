import { test as base } from '@playwright/test'

import { Register } from '../support/actions/Register'
import { LocalStorageService } from '../utils/localStorage.service'
import { Login } from '../support/actions/Login'
import { UserTransferRegistration } from '../support/flows/UserTransferFlow'
import { Transfer } from '../support/actions/Transfer'
import { Modal } from '../support/actions/Components'
import { Extract } from '../support/actions/Extract'
import { Warning } from '../support/actions/Components'
import { Url } from '../support/actions/Components'

type Classes = {
  register: Register,
  localStorageData: LocalStorageService,
  login: Login
  userTransferRegistration: UserTransferRegistration
  transfer: Transfer
  modal: Modal
  extract: Extract
  warning: Warning
  url: Url
};

export const test = base.extend<Classes>({
  register: async ({ page }, use) => {
    const register = new Register(page)
    await use(register)
  },

  localStorageData: async ({ page }, use) => {
    const localStorageData = new LocalStorageService(page)
    await use(localStorageData)
  },
  
  login: async ({ page }, use) => {
    const login = new Login(page)
    await use(login)
  },

  userTransferRegistration: async ({ page }, use) => {
    const userTransferRegistration = new UserTransferRegistration(page)
    await use(userTransferRegistration)
  },

  transfer: async ({ page }, use) => {
    const transfer = new Transfer(page)
    await use(transfer)
  },

  modal: async({ page }, use) => {
    const modal = new Modal(page)
    await use(modal) 
  },

  extract: async({ page }, use) => {
    const extract = new Extract(page)
    await use(extract)
  },

  warning: async({ page }, use) => {
    const warning = new Warning(page)
    use(warning)
  },

  url: async({ page }, use) => {
    const url = new Url(page)
    use(url)
  }
});

export { expect } from '@playwright/test'