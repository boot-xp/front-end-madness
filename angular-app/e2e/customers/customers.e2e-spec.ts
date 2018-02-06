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
})
