import {CustomersPage} from "./customers.po";

describe('Customers', () => {
  let page: CustomersPage;

  beforeEach(() => {
    page = new CustomersPage();
  })

  it('should show empty customers', () => {
    page.navigateTo();

    expect(page.getCustomersList().isPresent()).toBe(true);
    expect(page.getCustomers().count()).toBe(0);
  })
})
