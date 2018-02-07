import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRootComponent } from './customers-root.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatListModule} from "@angular/material";

describe('CustomersRootComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: CustomersRootComponent;
  let fixture: ComponentFixture<CustomersRootComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ CustomersRootComponent ],
      imports: [
        HttpClientTestingModule,
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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

  afterEach(() => {
    httpTestingController.verify();
  })
});
