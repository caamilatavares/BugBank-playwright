import { Page } from '@playwright/test';

export class LocalStorageService {
  constructor(readonly page: Page) {
    this.page = page
  }

    async saveStorageState(): Promise<void> {
        await this.page.context().storageState({ 
            path: "tests/fixtures/storageState.json"
        });
    }
}