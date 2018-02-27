import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  form: FormGroup;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['']
    })
  }

  save() {
    const customer = { name: this.form.value.name };
    this.http.post('http://localhost:5000/api/customers', customer)
      .subscribe(() => this.router.navigateByUrl('/customers'));
  }
}
