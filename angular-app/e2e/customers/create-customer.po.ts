import {by, element} from "protractor";

export class CreateCustomerPage {
  enterName(name: string) {
    element(by.id('name')).sendKeys(name);
  }

  save() {
    element(by.id('createCustomer')).click();
  }
}
