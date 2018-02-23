import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRootComponent } from './customers-root.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatListModule} from "@angular/material";
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('CustomersRootComponent', () => {
  let router: Router;
  let httpTestingController: HttpTestingController;
  let component: CustomersRootComponent;
  let fixture: ComponentFixture<CustomersRootComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ CustomersRootComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(CustomersRootComponent);
    component = fixture.componentInstance;
  });

  it('should get customers from api', () => {
    fixture.detectChanges();
    const req = httpTestingController.expectOne('http://localhost:5000/api/customers');
    expect(req.request.method).toBe('GET');
    expect(req.flush({items: [] }));
  });

  it('should show customers list', async(() => {
    fixture.detectChanges();

    const req = httpTestingController.expectOne('http://localhost:5000/api/customers');
    req.flush({items: [{}, {}] });

    fixture.detectChanges(); // IMPORTANT
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelectorAll('.customers-list').length).toBe(1);
      expect(fixture.nativeElement.querySelectorAll('.customer-list-item').length).toBe(2);
    })
  }))

  it('should create customer', async(() => {
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();
    const req = httpTestingController.expectOne('http://localhost:5000/api/customers');
    req.flush({items: []});
    fixture.detectChanges();

    fixture.debugElement.query(By.css('#createCustomer')).triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect((<any>router.navigateByUrl).calls.mostRecent().args[0].toString()).toBe('/customers/create-customer');
    })
  }))

  it('should show customer name', async(() => {
    fixture.detectChanges();

    const req = httpTestingController.expectOne('http://localhost:5000/api/customers');
    req.flush({items: [{ name: 'Hello' }] });

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.customer-list-item')).nativeElement.textContent).toContain('Hello');
    })
  }))

  afterEach(() => {
    httpTestingController.verify();
  })
});
