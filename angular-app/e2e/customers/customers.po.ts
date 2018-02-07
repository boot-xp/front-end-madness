import { browser, element, by } from 'protractor';

export class CustomersPage {
  navigateTo() {
    browser.get('/customers');
  }

  getCustomersList() {
    return element(by.className('customers-list'));
  }

  getCustomers() {
    return element.all(by.className('customer-list-item'));
  }
}
