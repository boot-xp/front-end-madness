import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule, MatInputModule, MatListModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersRootComponent } from './components/customers-root/customers-root.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    HttpClientModule,
    CustomersRoutingModule
  ],
  declarations: [CustomersRootComponent, CreateCustomerComponent]
})
export class CustomersModule { }
