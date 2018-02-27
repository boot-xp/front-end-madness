import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatButtonModule,
  MatCardModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersRootComponent } from './components/customers-root/customers-root.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    CustomersRoutingModule
  ],
  declarations: [CustomersRootComponent, CreateCustomerComponent]
})
export class CustomersModule { }
