import { browser, element, by } from 'protractor';

export class CustomersPage {
  navigateTo() {
    browser.get('/customers');
  }

  getCustomersList() {
    return element(by.className('customer-list'));
  }

  getCustomers() {
    return element.all(by.className('customer-list-item'));
  }
}
