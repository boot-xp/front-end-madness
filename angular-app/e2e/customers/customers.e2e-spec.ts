import {CustomersPage} from "./customers.po";

describe('Customers', () => {
  let page: CustomersPage;

  beforeEach(() => {
    page = new CustomersPage();
  })

  it('should show empty customers', () => {
    page.navigateTo();

    expect(page.getCustomersList().isPresent()).toBe(true, 'Customers list is not present on page');
    expect(page.getCustomers().count()).toBe(0, 'Customers list is not empty');
  })

  it('should create a new customer', () => {
    page.navigateTo();

    const createPage = page.addCustomer();
    createPage.enterName('Jack');
    createPage.save();

    expect(page.getCustomers().count()).toBe(1, 'Customers list does not contain new customer');
    expect(page.getCustomers().getText()).toContain('Jack', 'Customers list did not contain customer with name Jack');
  })
})
