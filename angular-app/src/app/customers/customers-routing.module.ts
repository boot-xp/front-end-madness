import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersRootComponent} from "./components/customers-root/customers-root.component";
import {CreateCustomerComponent} from "./components/create-customer/create-customer.component";

const routes: Routes = [
  { path: '', component: CustomersRootComponent },
  { path: 'create-customer', component: CreateCustomerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
