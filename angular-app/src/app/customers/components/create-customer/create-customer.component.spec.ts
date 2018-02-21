import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerComponent } from './create-customer.component';
import {By} from "@angular/platform-browser";
import {MatFormFieldModule, MatInputModule} from "@angular/material";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('CreateCustomerComponent', () => {
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<CreateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(CreateCustomerComponent);
    fixture.detectChanges();
  });

  it('should save customer with name', async(() => {
    const input = fixture.debugElement.query(By.css('#name')).nativeElement;
    input.value = 'The Name';
    input.dispatchEvent(new Event('input'));

    fixture.debugElement.query(By.css('#createCustomer')).triggerEventHandler('click', null);

    const req = httpTestingController.expectOne('http://localhost:5000/customers');
    fixture.whenStable().then(() => {
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ name: 'The Name' });
    })
    req.flush({status: 201});
  }));
});
