import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersRootComponent } from './components/customers-root/customers-root.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    HttpClientModule,
    CustomersRoutingModule
  ],
  declarations: [CustomersRootComponent, CreateCustomerComponent]
})
export class CustomersModule { }
