import { browser, element, by } from 'protractor';
import {CreateCustomerPage} from "./create-customer.po";

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

  addCustomer() {
    element(by.id('createCustomer')).click();
    return new CreateCustomerPage();
  }
}
